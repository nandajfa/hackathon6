import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Layout from '../pages/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './privateRoute'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />

        <Route path="*" element={<Login />} />
        <Route
          path="/menu"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
