const adminUserController = require('../controllers/adminUserController')
const authenticate = require('../middleware/authMiddleware')
const authorizeAdmin = require('../middleware/authorizeAdmin')

async function adminUserRoutes(fastify, options) {
  fastify.get('/admin/users', {
    schema: {
      description: 'Obtém uma lista de todos os usuários cadastrados.',
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminUserController.getUsers
  })

  fastify.get('/admin/users/:id', {
    schema: {
      description: 'Obtém os detalhes de um usuário específico usando o ID.',
      tags: ['admin', 'users'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminUserController.getUserById
  })

  fastify.post('/admin/users', {
    schema: {
      description: 'Cria um novo usuário com as informações fornecidas.',
      tags: ['admin', 'users'],
      body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          admin: { type: 'boolean' }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminUserController.createUser
  })

  fastify.patch('/admin/users/:id', {
    schema: {
      description:
        'Atualiza as informações de um usuário existente pelo ID fornecido.',
      tags: ['admin', 'users'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          admin: { type: 'boolean' }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminUserController.updateUser
  })

  fastify.delete('/admin/users/:id', {
    schema: {
      escription: 'Deleta um usuário existente pelo ID fornecido.',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminUserController.deleteUser
  })
}

module.exports = adminUserRoutes
