import axios from 'axios'

export const isAuthenticated = async () => {
  try {
    const response = await axios.get('http://localhost:3003/api/check-auth', {
      withCredentials: true
    })
    return response.data.authenticated
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error)
    return false
  }
}

export const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const setUser = user => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const logout = async () => {
  await axios.get('http://localhost:3003/api/logout', {
    withCredentials: true
  })
  localStorage.removeItem('user')
}
