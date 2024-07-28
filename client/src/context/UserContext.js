import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3003/api/admin/users',
        { withCredentials: true }
      )
      setUsers(response.data)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const toggleAdminStatus = async (userId, admin) => {
    try {
      const response = await axios.patch(
        `http://localhost:3003/api/admin/users/${userId}`,
        { admin: !admin },
        { withCredentials: true }
      )
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, admin: response.data.admin } : user
        )
      )
    } catch (error) {
      console.error('Erro ao atualizar status de admin:', error)
    }
  }

  return (
    <UserContext.Provider value={{ users, fetchUsers, toggleAdminStatus }}>
      {children}
    </UserContext.Provider>
  )
}
