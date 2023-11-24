import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userIsLogged } from 'services/authService'

interface Props {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: Props) => {
  const navigate = useNavigate()

  const validatePermission = () => {
    const isLogged = userIsLogged()

    if (!isLogged) {
      navigate('/')
    }
  }

  useEffect(() => {
    validatePermission()
  }, [])

  return <>{children}</>
}

export default PrivateRoute
