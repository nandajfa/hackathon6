const { registerUser, loginUser } = require('../services/authService')

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

module.exports = { register, login }
