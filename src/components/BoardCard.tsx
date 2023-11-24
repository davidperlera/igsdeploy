import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import Typography from '@mui/material/Typography'
import deleteIcon from 'assets/borrar.png'
import editIcon from 'assets/editar.png'
import Routes from 'enums/Routes'
import Board from 'models/Board'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationService from 'services/NotificationService'
import { deleteBoard } from 'services/boardService'
import DateUtils from 'utils/DateUtils'
import ConfirmationDialog from './ConfirmationDialog'

interface Props {
  board: Board;
  /**
   * Function for notify change to parent component
  */
  notify: () => void;
  onUpdate: (board: Board) => void;
}

const BoardCard = ({ board, notify, onUpdate }: Props) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const toggleDialog = () => setOpenDialog(value => !value);
  const handleNavigation = () => navigate(Routes.BOARD.replace(':id', board.id))

  const handleDelete = async () => {
    try {
      await deleteBoard(board.id);
      notify();
      NotificationService.success('Board deleted successfully');
    } catch (error) {
      NotificationService.error(`Error deleting board ${board.title}`);
    }
  }

  return (
    <>
      <Box className="flex-col sm:flex-row items-center flex justify-between bg-slate-50 w-5/6 h-15 rounded-lg my-2">
        <Box className="m-4 w-[100%] cursor-pointer capitalize" onClick={handleNavigation}>
          <Typography className="!mx-4 !mt-2">{board.title}</Typography>
          <Typography className="!mx-4 !mt-1 text-[#495057] opacity-75">
            {`${DateUtils.formatDate(board.created)}`}
          </Typography>
        </Box>
        {/* Buttons */}
        <Box className="sm:mr-8 flex w-[100%] sm:w-[unset] justify-between">
          <Button className=" !m-1 w-[50%] mx-auto grid justify-items-end" onClick={() => onUpdate(board)}>
            <Icon>
              <img src={editIcon} />
            </Icon>
          </Button>
          <Button className='mx-auto w-[50%]' onClick={toggleDialog}>
            <Icon>
              <img src={deleteIcon} />
            </Icon>
          </Button>
        </Box>
      </Box>
      <ConfirmationDialog open={openDialog} onClose={toggleDialog} onSuccess={handleDelete} />
    </>
  )
}

export default BoardCard;