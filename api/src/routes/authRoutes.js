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
    description: 'Cria um novo usuário com as informações fornecidas.',
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
      description: 'Realiza o login do usuário com email e senha.',
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
      description: 'Obtém os detalhes de um usuário específico usando o ID.',
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
      description:
        'Atualiza as informações de um usuário específico usando o ID.',
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
    schema: {
      description: 'Verifica se o usuário está autenticado.'
    },
    handler: checkAuthController
  })

  fastify.get('/logout', {
    schema: {
      description: 'Realiza o logout do usuário.'
    },
    preHandler: authenticate,
    handler: logoutController
  })
}

module.exports = authRoutes
