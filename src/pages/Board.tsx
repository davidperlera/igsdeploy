import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Box, Typography } from '@mui/material'
import ConfirmationDialog from 'components/ConfirmationDialog'
import KanbanCard from 'components/KanbanCard'
import KanbanSection from 'components/KanbanSection'
import Navbar from 'components/Navbar'
import CardStatus from 'enums/CardStatus'
import Routes from 'enums/Routes'
import MockBoard from 'mocks/MockBoard'
import Board from 'models/Board'
import Card from 'models/Card'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteCard, updateCard } from 'services/CardService'
import NotificationService from 'services/NotificationService'
import { getBoard, updateBoard } from 'services/boardService'
import { getUserId } from 'services/userService'

const BoardPage = () => {
  const [board, setBoard] = useState<Board>(MockBoard)
  const [cards, setCards] = useState<Card[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [updateOn, setUpdateOn] = useState<Date>(new Date());
  const wasLoaded = useRef<boolean>(false);
  const params = useParams();
  const navigate = useNavigate();

  const closeDialog = () => {
    setSelectedCard(null);
    setOpenDialog(false);
  }

  const getCards = (status: CardStatus): Card[] => {
    return cards
      .filter((card) => card.status === status)
      .sort((c1, c2) => c1.order - c2.order)
  }

  const TodoCards = useMemo(() => getCards(CardStatus.TO_DO), [cards])
  const inProgressCards = useMemo(
    () => getCards(CardStatus.IN_PROGRESS),
    [cards]
  )
  const reviewCards = useMemo(() => getCards(CardStatus.REVIEW), [cards])
  const doneCards = useMemo(() => getCards(CardStatus.DONE), [cards])

  const items = {
    [CardStatus.TO_DO]: TodoCards,
    [CardStatus.IN_PROGRESS]: inProgressCards,
    [CardStatus.REVIEW]: reviewCards,
    [CardStatus.DONE]: doneCards
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragStart = (event: DragStartEvent) => setActiveId(`${event.active.id}`);
  const handleDragCancel = (event: DragCancelEvent) => handleChangeCardPosition();
  const handleDragEnd = (event: DragEndEvent) => handleChangeCardPosition();

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    const id = active.id
    const overId = over?.id ?? ''

    // If dragging is not happen over a card we should return and do nothing
    if (!overId || id === overId) {
      return
    }

    // If over happens on a new category section of cards we change the status for card
    if (overId in CardStatus) {
      const status = overId as CardStatus
      const orderedCards = cards.map((card) => {
        if (card.id === id) {
          return {
            ...card,
            status
          }
        }

        return card
      })

      setCards(orderedCards)
      return
    }

    // If over element is an item

    // if the active element is placed below an element we should add to the array after the over element
    // Otherwise should be before
    const isBelowOverItem =
      over &&
      active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height

    const indexModifier = isBelowOverItem ? 1 : 0

    // Retrieve both active and over card
    const activeCard = cards.find((card) => card.id === id) as Card
    const overCard = cards.find((card) => card.id === overId) as Card

    // Get status and index of over card
    const { status, order } = overCard

    const toAdd: Card = {
      ...activeCard,
      status,
      order: order + indexModifier
    }

    // Get cards only by type
    const typecards = [...getCards(status)].sort(
      (c1, c2) => c1.order - c2.order
    )

    const newIndex = isBelowOverItem
      ? order + indexModifier - 2
      : order + indexModifier - 1

    if (activeCard.status === overCard.status) {
      // If the status is the same we should delete the element that is in the array before of movement
      typecards.splice(activeCard.order - 1, 1)
    }

    // Add in new index the element to Add
    typecards.splice(newIndex, 0, toAdd)

    const ordered = typecards.map((card, index) => {
      return {
        ...card,
        order: index + 1
      }
    })

    setCards((oldCards) => {
      const newCards = oldCards.map((card) => {
        const newCard = ordered.find((tc) => tc.id === card.id)
        if (!!newCard) {
          return newCard
        }
        return card
      })

      return newCards
    })
  }

  const fetchBoard = async () => {
    try {
      if (!!params.id) {
        const fetched = await getBoard(getUserId(), params.id);
        wasLoaded.current = true;
        setBoard(fetched);
      } else {
        navigate(Routes.HOME, { state: { error: true } });
      }
    } catch {
      if (!!wasLoaded.current) {
        NotificationService.error('Error loading board, refresh the website')
      } else {
        navigate(Routes.HOME, { state: { error: true, message: "Board doesn't exist!" } });
      }
    }
  }

  useEffect(() => {
    fetchBoard();
  }, [updateOn])

  useEffect(() => {
    setCards(board.cards)
  }, [board])

  const saveBoard = async () => {
    const saveBoard = {
      ...board,
      cards: board.cards.map(card => card.id),
    }
    await updateBoard(board.id, saveBoard as unknown as Board)
  }

  const handleChangeCardPosition = async () => {
    await Promise.all(cards.map((card) => {
      const newCard = {
        ...card,
        categories: card.categories.map(cat => cat.id)
      } as unknown as Card;

      updateCard(newCard);
    }))
    setActiveId('');
    saveBoard();
  }

  const saveCard = async (cardId: string) => {
    const newBoard = {
      ...board,
      cards: [...board.cards.map(card => card.id), cardId],
    }
    await updateBoard(board.id, newBoard as unknown as Board);
    setUpdateOn(new Date());
  }

  const handleUpdateCard = async () => {
    const newBoard = {
      ...board,
      cards: board.cards.map(card => card.id),
    }

    await updateBoard(board.id, newBoard as unknown as Board);
    setUpdateOn(new Date());
  }

  const handleDeleteCard = (card: Card) => {
    setSelectedCard(card);
    setOpenDialog(true);
  }

  const deleteSelectedCard = async () => {
    try {
      await deleteCard(selectedCard?.id ?? '')
      setUpdateOn(new Date());
    } catch {
      NotificationService.error('Error deleting card!')
    }
  }

  return (
    <>
      <Box>
        <Navbar hideSearch />
        <Box className='flex flex-col'>
          <Typography className='!m-10 uppercase !text-xl'>{board.title}</Typography>
          <Box className="flex xl:justify-evenly items-stretch mb-8 overflow-y-auto !max-w[95vw] ">
            <DndContext
              collisionDetection={closestCorners}
              sensors={sensors}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragCancel={handleDragCancel}
            >
              {Object.keys(items).map((key) => (
                //@ts-ignore
                <KanbanSection key={key} cards={items[key]} status={key} saveCard={saveCard} onDeleteCard={handleDeleteCard} onUpdateCard={handleUpdateCard} />
              ))}
              <DragOverlay>
                {!!activeId ? (
                  <KanbanCard
                    card={cards.find((card) => card.id === activeId) as Card}
                    onDeleteCard={handleDeleteCard}
                    onUpdateCard={() => {}}
                  />
                ) : null}
              </DragOverlay>
            </DndContext>
          </Box>
        </Box>
      </Box>
      <ConfirmationDialog open={openDialog} onClose={closeDialog} onSuccess={deleteSelectedCard} />
    </>
  )
}

export default BoardPage
