import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Circles from 'components/Circles'
import LoginForm from 'components/LoginForm'
import RegisterForm from 'components/RegisterForm'
import { useState } from 'react'

const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  return (
    <Box className="flex h-screen bg-light lg:bg-inherit">
      <Circles/>
      <Box className="w-[100%] flex justify-center items-center lg:block  lg:w-1/2 flex flex-col !m-auto">
        <Box className="flex justify-evenly w-[100%] md:w-4/5">
          <Button
            className={`!text-xl w-[45%] md:w-2/5 !py-2 !underline !font-roboto !text-black !border-0 ${isLogin ? '!bg-light' : ''
              }`}
            variant="outlined"
            onClick={() => setIsLogin(true)}
          >
            Login
          </Button>
          <Button
            className={`!text-xl w-[45%] md:w-2/5 !py-2 !underline !font-roboto !text-black !border-0 ${!isLogin ? '!bg-light' : ''
              }`}
            variant="outlined"
            onClick={() => setIsLogin(false)}
          >
            Sign-Up
          </Button>
        </Box>
        {isLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}
      </Box>
    </Box>
  )
}

export default Login
