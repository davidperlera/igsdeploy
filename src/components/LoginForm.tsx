import { Button, InputAdornment, TextField } from "@mui/material";
import PasswordIcon from 'assets/candado.png';
import PasswordOffIcon from 'assets/password_off.png';
import PasswordOnIcon from 'assets/password_on.png';
import UserIcon from 'assets/usuario.png';
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "services/authService";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleLogin = (values: any) => {
    login(values.username, values.password)
      .then((_) => window.location.reload())
      .catch(() =>
        toast.error(`Invalid credentials`, {
          position: toast.POSITION.TOP_RIGHT
        })
      )
  }

  const loginForm = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: handleLogin
  })

  return (
    <form
      onSubmit={loginForm.handleSubmit}
      className="flex flex-col pt-6 lg:p-8 w-[100%] md:w-4/5 h-1/2"
    >
      <TextField
        name="username"
        onChange={loginForm.handleChange}
        value={loginForm.values.username}
        label="Username or email"
        className="!m-auto !my-3 w-4/5 bg-neutral-100"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                src={UserIcon}
                alt="user icon"
                style={{ width: '1.3rem', height: '1.3rem' }}
              />
            </InputAdornment>
          )
        }}
      />
      <TextField
        name="password"
        type={showPassword ? 'text' : 'password'}
        onChange={loginForm.handleChange}
        value={loginForm.values.password}
        label="Password"
        className="!m-auto !my-3 w-4/5 bg-neutral-100"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                src={PasswordIcon}
                alt="password icon"
                style={{ width: '1.65rem', height: '1.65rem' }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start">
              <Button
                sx={{
                  width: '1.75rem',
                  height: '1.45rem',
                  minWidth: 'unset',
                  padding: '0 !important'
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? PasswordOffIcon : PasswordOnIcon}
                  alt="password icon"
                  style={{ width: '1.65rem', height: '1.65rem' }}
                />
              </Button>
            </InputAdornment>
          )
        }}
      />
      <Button
        type="submit"
        variant="contained"
        className="!m-auto !my-3 w-4/5"
        sx={{
          backgroundColor: '#9F8BF9',
          '&:hover': { backgroundColor: '#BEB1FB' }
        }}
        size="medium"
      >
        Login
      </Button>
    </form>
  )
}

export default LoginForm;