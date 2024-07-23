const {
  register,
  login,
  getUserProfile,
  updateUserProfile
} = require('../controllers/authController')

async function authRoutes(fastify, options) {
  fastify.post('/register', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 8 }
        }
      }
    },
    handler: register
  })

  fastify.post('/login', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 8 }
        }
      }
    },
    handler: login
  })

  fastify.get('/users/:id', {
    handler: getUserProfile
  })

  fastify.put('/users/:id', {
    handler: updateUserProfile
  })
}

module.exports = authRoutes
