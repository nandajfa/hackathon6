const userService = require('../services/AdminUserService')

async function getUsers(request, reply) {
  try {
    const users = await userService.getUsers()
    reply.send(users)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function getUserById(request, reply) {
  try {
    const { id } = request.params
    const user = await userService.getUserById(id)
    reply.send(user)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function createUser(request, reply) {
  try {
    const newUser = await userService.createUser(request.body)
    reply.code(201).send(newUser)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function updateUser(request, reply) {
  try {
    const { id } = request.params
    const updatedUser = await userService.updateUser(id, request.body)
    reply.send(updatedUser)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function deleteUser(request, reply) {
  try {
    const { id } = request.params
    await userService.deleteUser(id)
    reply.code(204).send()
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
