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
    preHandler: authenticate,
    handler: getUserProfile
  })

  fastify.put('/users/:id', {
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
