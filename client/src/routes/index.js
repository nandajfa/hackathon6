import Home from '../pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import { PrivateRoute } from './privateRoute'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/sign-up" element={<Register />} /> */}

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
