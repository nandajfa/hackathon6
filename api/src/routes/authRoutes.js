const {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  logoutController,
  checkAuthController
} = require('../controllers/authController')
const authenticate = require('../middleware/authMiddleware')

async function authRoutes(fastify, options) {
  fastify.post('/register', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 }
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
          password: { type: 'string', minLength: 6 }
        }
      }
    },
    handler: login
  })

  fastify.get('/users/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      }
    },
    preHandler: authenticate,
    handler: getUserProfile
  })

  fastify.put('/users/:id', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 }
        }
      },
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      }
    },
    preHandler: authenticate,
    handler: updateUserProfile
  })

  fastify.get('/check-auth', {
    handler: checkAuthController
  })

  fastify.get('/logout', {
    preHandler: authenticate,
    handler: logoutController
  })
}

module.exports = authRoutes
