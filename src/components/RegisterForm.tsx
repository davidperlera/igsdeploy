import { InputAdornment, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import PasswordIcon from 'assets/candado.png'
import PasswordOffIcon from 'assets/password_off.png'
import PasswordOnIcon from 'assets/password_on.png'
import UserIcon from 'assets/usuario.png'
import { useFormik } from 'formik'
import { useState } from 'react'
import NotificationService from 'services/NotificationService'
import { signUp } from 'services/authService'

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)

  const handleSignup = (values: any) => {
    signUp(
      values.username,
      values.email,
      values.password,
      values.passwordConfirmation
    )
      .then((_) => window.location.reload())
      .catch((_) => {
        NotificationService.error('Invalid inputs')
      })
  }

  const signupForm = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      passwordConfirmation: ''
    },
    onSubmit: handleSignup
  })

  return (
    <form
      onSubmit={signupForm.handleSubmit}
      className="flex flex-col pt-6 lg:p-8 w-[100%] md:w-4/5 h-1/2"
    >
      <TextField
        name="username"
        onChange={signupForm.handleChange}
        value={signupForm.values.username}
        label="Username"
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
        name="email"
        onChange={signupForm.handleChange}
        value={signupForm.values.email}
        label="Email"
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
        onChange={signupForm.handleChange}
        value={signupForm.values.password}
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
      <TextField
        name="passwordConfirmation"
        type={showPasswordConfirm ? 'text' : 'password'}
        onChange={signupForm.handleChange}
        value={signupForm.values.passwordConfirmation}
        label="Confirm Password"
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
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              >
                <img
                  src={showPasswordConfirm ? PasswordOffIcon : PasswordOnIcon}
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
        Sign up
      </Button>
    </form>
  )
}

export default RegisterForm;