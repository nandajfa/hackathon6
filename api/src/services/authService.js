require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { supabase } = require('../db/supabase')

const registerUser = async (name, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const { error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }])

    if (error) {
      console.error('Supabase error:', error.message)
      throw new Error(error.message)
    }

    return 'Successfully registered user'
  } catch (error) {
    console.error('Error registering user:', error)
    throw new Error('Failed to register user')
  }
}

const loginUser = async (reply, email, password) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !data) {
    throw new Error('User not found')
  }

  const isPasswordValid = await bcrypt.compare(password, data.password)
  if (!isPasswordValid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign(
    { id: data.id, email: data.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )

  if (!token) {
    return { message: 'Fail' }
  } else {
    reply.setCookie('token', token, {
      httpOnly: true,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60,
      path: '/'
    })
    return {
      message: 'Success',
      user: { name: data.name, id: data.id, email: data.email }
    }
  }
}

const getUserById = async userId => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const updateUserById = async (userId, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select('*')
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const logoutUser = (request, reply) => {
  reply.clearCookie('token')
  return 'Token de autenticação removido com sucesso.'
}

const checkAuth = async request => {
  const token = request.cookies.token

  if (!token) {
    return { authenticated: false }
  }

  try {
    const secret = process.env.JWT_SECRET
    return new Promise(resolve => {
      jwt.verify(token, secret, err => {
        if (err) {
          console.error('Erro ao verificar o token:', err)
          resolve({ authenticated: false })
        } else {
          resolve({ authenticated: true })
        }
      })
    })
  } catch (error) {
    console.error('Erro ao obter o segredo:', error)
    return { authenticated: false }
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
  logoutUser,
  checkAuth
}
