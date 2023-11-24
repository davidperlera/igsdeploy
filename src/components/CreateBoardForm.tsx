import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Board from "models/Board";

interface FormFields {
  title: string;
}

interface Props {
  onSubmit: (values: FormFields) => void;
  board: Board | null;
}


const CreateBoardForm = ({ onSubmit, board }: Props) => {

  const formik = useFormik({
    initialValues: {
      title: board?.title ?? ''
    },
    onSubmit
  })

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col py-8">
      <Typography className='w-[100%] text-center !font-bold !text-3xl'>Board title</Typography>
      <TextField
        name="title"
        onChange={formik.handleChange}
        value={formik.values.title}
        className="!m-auto !my-3 w-[96%] sm:w-4/5 bg-[#FFFFFF] [&>*]:!border-none  [&>*]:!rounded-lg"
        size="small"
      />
      <Button
        type="submit"
        variant="contained"
        className="!m-auto !mt-10 w-[96%] sm:w-2/6 !py-3 !rounded-lg"
        sx={{
          backgroundColor: '#9F8BF9',
          color: '#343A40',
          '&:hover': { backgroundColor: '#BEB1FB' }
        }}
        size="medium"
      >
        {!!board ? 'Update board' : 'Create board'}
      </Button>
    </form>
  )
}

export default CreateBoardForm;