import PrivateRoute from 'components/PrivateRoute'
import BoardList from 'pages/BoardList'
import Login from 'pages/Login'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import NotificationService from 'services/NotificationService'
import { userIsLogged } from 'services/authService'

const Home = () => {
  const location = useLocation();

  const handleError = () => {
    if (!!location.state?.error) {
      NotificationService.error(location.state.message ?? 'Page not found');
    }
    window.history.replaceState({}, document.title)
  }

  useEffect(() => {
    handleError();
  }, [])

  return userIsLogged() ? (
    <PrivateRoute>
      <BoardList />
    </PrivateRoute>
  ) : (
    <Login />
  )
}

export default Home
