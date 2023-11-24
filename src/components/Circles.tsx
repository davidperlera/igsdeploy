import { Box } from "@mui/material";

const Circles = () => {
  return (
  <Box className="hidden lg:block relative overflow-hidden h-screen w-1/2">
    <Box className="absolute z-30 left-0 -top-7 rounded-r-full overflow-hidden h-[108%] my-auto  w-9/12 bg-light border-solid border-2 border-light" />
    <Box className="absolute z-20 left-0 -top-7 rounded-r-full overflow-hidden h-[108%] my-auto w-10/12 bg-medium border-solid border-2 border-medium" />
    <Box className="absolute z-10 left-0 -top-7 rounded-r-full overflow-hidden h-[108%] my-auto w-11/12 bg-dark border-solid border-2 border-dark" />
  </Box>
  )
}

export default Circles;