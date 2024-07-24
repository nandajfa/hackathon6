const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

async function authenticate(request, reply) {
  try {
    const token = request.cookies.token

    if (!token) {
      reply.code(401).send({ message: 'Unauthorized' })
      return
    }

    const decoded = jwt.verify(token, secretKey)
    request.user = decoded
    return
  } catch (error) {
    reply.code(401).send({ message: 'Unauthorized' })
  }
}

module.exports = authenticate
