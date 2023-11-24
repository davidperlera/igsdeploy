import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import { Box, Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import CreateCard from 'components/CreateCard'
import CardStatus from 'enums/CardStatus'
import Card from 'models/Card'
import Category from 'models/Category'
import { useEffect, useMemo, useState } from 'react'
import { createCard, updateCard } from 'services/CardService'
import { getTitleByStatus } from 'utils/StringUtils'
import KanbanCard from './KanbanCard'

interface Props {
  status: CardStatus
  cards: Card[]
  saveCard: (cardId: string) => void;
  onDeleteCard: (card: Card) => void;
  onUpdateCard: () => void;
}

const KanbanSection = ({ status, cards, saveCard, onDeleteCard, onUpdateCard }: Props) => {
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const title = useMemo(() => getTitleByStatus(status), [status])
  const id = `${status}`;
  const { setNodeRef } = useDroppable({ id });

  const closeForm = () => {
    setOpenDialogForm(false);
    setSelectedCard(null);
  };
  const openForm = () => setOpenDialogForm(true);

  const handleSaveCard = async (title: string, description: string, categories: Category[], cardId = '') => {
    if (!!cardId) {
      const card = cards.find(card => card.id === cardId)!;
      const updated = {
        ...card,
        title,
        description,
        categories: categories.map(cat => cat.id),
      } as unknown as Card;

      updateCard(updated);
      onUpdateCard();
      setSelectedCard(null);
      return;
    }

    const newCard = await createCard(title, description, categories.map(cat => cat.id), status, cards.length);
    saveCard(newCard.id);
  }

  const handleCardUpdate = () => {
    setOpenDialogForm(true);
  }

  useEffect(() => {
    if (!!selectedCard) {
      handleCardUpdate();
    }
  }, [selectedCard])

  return (
    <>
      <Dialog open={openDialogForm} onClose={closeForm} fullWidth maxWidth='lg' className='[&>div>*]:!m-0 [&>div>*]:!w-[94%]'>
        <DialogContent className='!p-2 sm:!p-5 bg-[#F2F6FA]'>
          <Box className='flex justify-end'>
            <IconButton onClick={closeForm}>
              <ClearIcon sx={{ fill: '#648dfe' }} />
            </IconButton>
          </Box>
          <CreateCard onSave={handleSaveCard} onClose={closeForm} card={selectedCard} />
        </DialogContent>
      </Dialog>
      <SortableContext
        id={id}
        items={cards}
        strategy={verticalListSortingStrategy}
      >
        <Box ref={setNodeRef} className="rounded-xl mx-3 border border-solid !min-h-[70vh] min-w-[320px] w-2/12 bg-[#F2F6FA]">
          <Box className='flex justify-between items-center w-5/6 m-auto'>
            <Typography className='!font-bold !my-6  uppercase !text-2xl' variant="h2">{title}</Typography>
            <Button onClick={openForm} className='!bg-[#d2defb] !w-10 !h-10 !min-w-0 !mb-2 !rounded-full'>
              <AddIcon />
            </Button>
          </Box>
          <Box className='w-5/6 m-auto'>
            {cards.map((card) => (
              <KanbanCard key={card.id} card={card} onDeleteCard={onDeleteCard} onUpdateCard={setSelectedCard} />
            ))}
          </Box>
        </Box>
      </SortableContext>
    </>
  )
}

export default KanbanSection
