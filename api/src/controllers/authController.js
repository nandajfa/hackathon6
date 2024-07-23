const {
  registerUser,
  loginUser,
  getUserById,
  updateUserById
} = require('../services/authService')

const register = async (request, reply) => {
  try {
    const { name, email, password } = request.body
    const res = await registerUser(name, email, password)
    reply.code(201).send(res)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

const login = async (request, reply) => {
  try {
    const { email, password } = request.body
    const user = await loginUser(reply, email, password)
    reply.code(200).send(user)
  } catch (error) {
    reply.code(401).send({ error: error.message })
  }
}

const getUserProfile = async (request, reply) => {
  try {
    const userId = request.params.id
    const user = await getUserById(userId)

    if (!user) {
      return reply.status(404).send({ error: 'User not found' })
    }

    const { password, ...userWithoutPassword } = user
    reply.send(userWithoutPassword)
  } catch (error) {
    reply.status(500).send({ error: error.message })
  }
}

const updateUserProfile = async (request, reply) => {
  try {
    const userId = request.params.id
    const { name, email } = request.body

    const updatedUser = await updateUserById(userId, { name, email })

    if (!updatedUser) {
      return reply.status(404).send({ error: 'User not found' })
    }

    reply.send('Updated successfully')
  } catch (error) {
    reply.status(500).send({ error: error.message })
  }
}

module.exports = { register, login, getUserProfile, updateUserProfile }
