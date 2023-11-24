import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import { Dialog, DialogContent, IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Colors from 'enums/Colors'
import Card from 'models/Card'
import Category from 'models/Category'
import { useEffect, useState } from 'react'
import NotificationService from 'services/NotificationService'
import { createCategory, getAllCategories } from 'services/categoryService'
import { getUserId } from 'services/userService'
import CategoryChip from './CategoryChip'
import CreateCategory from './CreateCategory'

interface Props {
  onSave: (title: string, description: string, categories: Category[], cardId?: string) => void;
  onClose: () => void;
  card: Card | null;
}

const CreateCard = ({ onSave, onClose, card }: Props) => {
  const [title, setTitle] = useState<string>(card?.title ?? '');
  const [description, setDescription] = useState<string>(card?.description ?? '');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [updateOn, setUpdateOn] = useState<Date>(new Date());
  const [categories, setCategories] = useState<Category[]>(card?.categories ?? []);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const response = await getAllCategories(getUserId());
    setAvailableCategories(response);
  }

  useEffect(() => {
    fetchCategories();
  }, [updateOn]);

  const handleTitleChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  }

  const handleDescriptionChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDescription(value);
  }

  const hasValidValues = (): boolean => {
    return !!title && !!description
  }

  const handleCreate = () => {
    try {
      if (!hasValidValues()) {
        NotificationService.error("Title and description could not be empty!");
        return;
      }

      if (!!card?.id) {
        onSave(title, description, categories, card.id);
      } else {
        onSave(title, description, categories);
      }
      onClose();
    } catch {
      NotificationService.error('Error creating card. Check the info!');
    }
  }

  const closeForm = () => setOpenDialog(false);

  const handleCategoryCreation = async (name: string, color: Colors) => {
    await createCategory(name, color, getUserId());
    setUpdateOn(new Date());
  }

  return (
    <>
      <Dialog open={openDialog} onClose={closeForm} fullWidth maxWidth='md' className='[&>div>*]:!m-0 [&>div>*]:!w-[94%]'>
        <DialogContent className='!p-2 sm:!p-5 bg-[#F2F6FA]'>
          <Box className='flex justify-end'>
            <IconButton onClick={closeForm}>
              <ClearIcon sx={{ fill: '#648dfe' }} />
            </IconButton>
          </Box>
          <CreateCategory onClose={closeForm} onSave={handleCategoryCreation} />
        </DialogContent>
      </Dialog>
      <Box>
        <Box className="flex flex-col items-center justify-center !w-[100%] sm:w-[90%] h-[90%]  my-8 mx-auto bg-[#E2EAF4] rounded-xl">
          <Box className="bg-[#E2EAF4] flex flex-col items-center w-[100%] my-2">
            <Typography className="!mt-2 !text-lg">Title</Typography>
            <TextField
              value={title}
              onChange={handleTitleChange}
              placeholder="Insert the title"
              className='m-auto !my-3 w-[94%] sm:w-4/5 bg-[#FFFFFF] [&>*]:!border-none  [&>*]:!rounded-lg'
              size="small"
            />
          </Box>
          <Box className="bg-[#E2EAF4] flex flex-col items-center w-[100%] my-2">
            <Typography className="!mt-2 !text-lg">Description</Typography>
            <TextField
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Insert a description"
              className='m-auto !my-3 w-[94%] sm:w-4/5 bg-[#FFFFFF] [&>*]:!border-none  [&>*]:!rounded-lg'
              multiline
              size='small'
              rows={4}
              maxRows={4}
            />
          </Box>
          <Box className="bg-[#E2EAF4] flex flex-col items-center w-[100%] my-2">
            <Box className='flex relative w-[80%] items-baseline'>
              <Typography className="!mt-2 !text-lg w-[100%] text-center">Categories</Typography>
              <Button onClick={() => setOpenDialog(true)} className='!bg-[#d2defb] !w-10 !h-10 !min-w-0 !mb-2 !rounded-full !absolute !right-0  sm:!right-12'>
                <AddIcon />
              </Button>
            </Box>
            {!!availableCategories.length &&
              <Select
                size='small'
                multiple
                className='m-auto !my-3 w-[94%] sm:w-4/5 bg-[#FFFFFF] [&>*]:!border-none  [&>*]:!rounded-lg'
                value={categories}
                onChange={(event: SelectChangeEvent<Category[]>) => {
                  setCategories(event.target.value as Category[]);
                }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((category) => (
                      <CategoryChip key={category.id} category={category} />
                    ))}
                  </Box>
                )}
              >
                {availableCategories.map(category => (
                  //@ts-ignore
                  <MenuItem
                    key={category.id}
                    value={category}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            }
          </Box>
          <Button
            onClick={handleCreate}
            variant="contained"
            className="!m-auto !mb-8 w-1/3"
            sx={{
              backgroundColor: '#9F8BF9',
              '&:hover': { backgroundColor: '#BEB1FB' }
            }}
            size="medium"
          >
            Create
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default CreateCard
