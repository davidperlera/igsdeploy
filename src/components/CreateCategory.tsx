import { Box, Button, TextField, Typography } from "@mui/material";
import Colors from "enums/Colors";
import { useState } from "react";
import NotificationService from "services/NotificationService";
import ColorUtils from "utils/ColorUtils";

interface Props {
  onSave: (name: string, color: Colors) => void;
  onClose: () => void;
}

const CreateCategory = ({ onSave, onClose }: Props) => {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<Colors | null>(null);

  const handleNameChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  }

  const handleCreate = () => {
    try {
      if (!color) {
        NotificationService.error('You should choose a color before creating category');
        return;
      }

      if (!name) {
        NotificationService.error('Category name could not be empty!');
        return;
      }

      onSave(name, color);
      onClose();
      NotificationService.success('Category created successfully!')
    } catch {
      NotificationService.error('Error creating Category. Please give us a name and select a color!');
    }
  }

  const handleColorSelection = (color: Colors) => {
    setColor(color)
  }

  return (
    <Box className='flex flex-col items-center bg-[#E2EAF4]'>
      <Typography className='!text-2xl !my-4'>Category</Typography>
      <TextField
        value={name}
        onChange={handleNameChange}
        placeholder="Insert the name for category"
        className='m-auto !my-3 w-[94%] sm:w-4/5 bg-[#FFFFFF] [&>*]:!border-none  [&>*]:!rounded-lg'
        size="small"
      />
      <Typography className='!text-2xl !my-4'>Color</Typography>
      <Box className='flex flex-wrap justify-center  mb-6 mx-0 sm:mx-0'>
        {Object.keys(Colors).map((key) =>
          <Box
            key={key}
            onClick={() => handleColorSelection(key as Colors)}
            sx={{
              border: color === key ? '0.25rem solid #3B429F' : 'none',
              backgroundColor: color === key ? ColorUtils.getColorTitle(key as Colors) : ColorUtils.getColorBackground(key as Colors),
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '100%',
              cursor: 'pointer',
              marginBlock: {
                xs: '0.75rem'
              },
              marginInline: {
                xs: '2rem',
                sm: '0.75rem',
              },
              "&:hover": {
                backgroundColor: ColorUtils.getColorTitle(key as Colors),
              }
            }}
          />)}
      </Box>
      <Button
        onClick={handleCreate}
        variant="contained"
        className="!m-auto !my-8 w-[80%] sm:w-1/3"
        sx={{
          backgroundColor: '#9F8BF9',
          '&:hover': { backgroundColor: '#BEB1FB' }
        }}
        size="medium"
      >
        Create category
      </Button>
    </Box>
  )
}

export default CreateCategory;