import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Layout from '../pages/Layout'
import Dashboard from '../pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import { PrivateRoute } from './privateRoute'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="menu" element={<Layout />} />
        <Route path="dash" element={<Dashboard />} />

        {/* <Route path="*" element={<Login />} /> */}
        {/* <Route
          path="/menu"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
