import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../services/auth'

export function PrivateRoute({ children }) {
  const ret = isAuthenticated()
  return ret ? children : <Navigate to="/login" />
}
