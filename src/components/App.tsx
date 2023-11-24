import BoardPage from 'pages/Board'
import Home from 'pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PrivateRoute from 'components/PrivateRoute'
import Routes from 'enums/Routes'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <Home />
  },
  {
    path: Routes.BOARD,
    element: (
      <PrivateRoute>
        <BoardPage />
      </PrivateRoute>
    )
  },
  {
    path: '*',
    element: <Navigate to={Routes.HOME} replace state={{error: true}}/>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
