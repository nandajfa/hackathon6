require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('fastify-jwt')
const { supabase } = require('../db/supabase')

const registerUser = async (name, email, password) => {
  //   const hashedPassword = await bcrypt.hash(password, 10)
  //   const { data, error } = await supabase
  //     .from('users')
  //     .insert([{ name, email, password: hashedPassword }])

  //   if (error) {
  //     throw new Error(error.message)
  //   }
  //   return data

  try {
    console.log('Registering user:', { name, email, password })

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('Hashed Password:', hashedPassword)

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }])

    if (error) {
      console.error('Supabase error:', error.message)
      throw new Error(error.message)
    }

    console.log('User registered successfully:', data)
    return data
  } catch (error) {
    console.error('Error registering user:', error)
    throw new Error('Failed to register user')
  }
}

const loginUser = async (email, password) => {
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
    process.env.JWT_SECRET
  )
  return { token }
}

module.exports = { registerUser, loginUser }
