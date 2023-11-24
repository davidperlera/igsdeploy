import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import AddIcon from '@mui/icons-material/Add'
import { Box, Icon, IconButton, Paper, Typography } from '@mui/material'
import deleteIcon from 'assets/borrar.png'
import editIcon from 'assets/editar.png'
import Card from 'models/Card'
import DateUtils from 'utils/DateUtils'
import CategoryChip from './CategoryChip'

interface Props {
  card: Card
  onDeleteCard: (card: Card) => void;
  onUpdateCard: (card: Card) => void;
}

const KanbanCard = ({ card, onDeleteCard, onUpdateCard }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    "& *:hover": {
      "& button": {
        opacity: '1 !important'
      }
    }
  }

  return (
    <Paper
      elevation={1}
      className={`${isDragging ? 'opacity-50' : ''} select-none my-4 w-[100%] mx-auto py-4 !rounded-lg relative`}
      ref={setNodeRef}
      sx={style}

    >
      <Box className='!mx-2 items-baseline relative'>
        {card.categories.map(category => <CategoryChip key={`${card.id}-${category.id}`} category={category} />)}
        <AddIcon className='!bg-[#d2defb] !mx-2 !w-4 !h-4 !min-w-0 !rounded-full !opacity-0' sx={{ width: '1rem' }} />
        <IconButton className='!absolute opacity-0 !right-8 !top-0' onClick={() => onUpdateCard(card)}>
          <Icon sx={{ width: '1rem', height: 'auto' }}>
            <img src={editIcon} />
          </Icon>
        </IconButton>
        <IconButton className='!absolute opacity-0 !right-0 !top-0' onClick={() => onDeleteCard(card)}>
          <Icon sx={{ width: '1rem', height: 'auto' }}>
            <img src={deleteIcon} />
          </Icon>
        </IconButton>

      </Box>
      <Box {...attributes} {...listeners}>
        <Typography className="!mx-4 !my-2 uppercase">{card.title}</Typography>
        <Typography className="!mx-4">{card.description}</Typography>
        <Typography className='!mx-4 capitalize !mt-4 text-[#495057] opacity-75' >{DateUtils.formatDate(card.created)}</Typography>
      </Box>
    </Paper>
  )
}

export default KanbanCard
