import ClearIcon from '@mui/icons-material/Clear'
import { Dialog, DialogContent, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import plusIcon from 'assets/plus.png'
import BoardCard from 'components/BoardCard'
import CreateBoardForm from 'components/CreateBoardForm'
import Navbar from 'components/Navbar'
import Board from 'models/Board'
import { useEffect, useState } from 'react'
import NotificationService from 'services/NotificationService'
import { createBoard, getAllBoards, updateBoard } from 'services/boardService'
import { getUserId } from 'services/userService'

const BoardList = () => {
  const [openBoardForm, setOpenBoardForm] = useState<boolean>(false);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);
  const [updateOn, setUpdateOn] = useState<Date>(new Date());

  const fetchBoards = async (search: string = '') => {
    try {
      const fetched = await getAllBoards(getUserId(), search);
      setBoards(fetched);
    } catch (error) {
      if (!`${error}`.includes('autocancelled')) {
        NotificationService.error('Error fetching boards');
      }
    }
  }

  useEffect(() => {
    fetchBoards();
  }, [updateOn]);

  const toggleForm = () => setOpenBoardForm(value => !value);
  const reload = () => setUpdateOn(new Date());

  const closeForm = () => {
    setOpenBoardForm(false);
    setSelectedBoard(null);
  }

  const handleCreate = async (values: any) => {
    try {
      const { title } = values;
      const ownerId = getUserId();

      await createBoard(title, ownerId);
      reload();
      NotificationService.success('Board created Successfully!');
    } catch (_) {
      NotificationService.error('Error creating board');
    } finally {
      toggleForm();
    }
  }

  const handleUpdate = async (values: any) => {
    try {
      const { title } = values;
      const board: Board = {
        ...selectedBoard!,
        title
      }

      await updateBoard(board.id, board);
      reload();
      NotificationService.success('Board updated Successfully!');
    } catch (_) {
      NotificationService.error('Error updating board');
    } finally {
      toggleForm();
    }
  }

  const handleBoardCreate = async (values: any) => {
    if (!values.title) {
      NotificationService.error('Title could not be empty')
      return;
    }
    !!selectedBoard ? handleUpdate(values) : handleCreate(values);
  }

  const handleUpdateBoard = (board: Board) => {
    setSelectedBoard(board);
    toggleForm();
  }

  const handleSearch = (text: string) => {
    fetchBoards(text)
  }

  return (
    <Box className="flex flex-col">
      <Navbar onSearch={handleSearch} />
      <Box className="flex flex-col w-[94vw]  md:w-[90vw] h-[80vh]  my-8 mx-auto bg-[#E2EAF4] rounded-xl">
        <Box className='flex justify-end m-4'>
          <Button className="!bg-[#C7D6FA] !min-w-0 !w-8 !h-8  md:!w-12 md:!h-12 !rounded-full" onClick={toggleForm}>
            <Icon className="!w-12 !h-12">
              <img src={plusIcon} />
            </Icon>
          </Button>
          <Dialog open={openBoardForm} onClose={closeForm} fullWidth maxWidth='md'>
            <DialogContent className='bg-[#F2F6FA]'>
              <Box className='flex justify-end'>
                <IconButton onClick={closeForm}>
                  <ClearIcon sx={{fill: '#648dfe'}} />
                </IconButton>
              </Box>
              <CreateBoardForm onSubmit={handleBoardCreate} board={selectedBoard} />
            </DialogContent>
          </Dialog>
        </Box>
        <Box className='flex flex-col justify-center items-center'>
          {boards.map(board => <BoardCard key={board.id} board={board} notify={reload} onUpdate={handleUpdateBoard} />)}
        </Box>
      </Box>
    </Box>
  )
}

export default BoardList
