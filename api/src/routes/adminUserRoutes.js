const adminUserController = require('../controllers/adminUserController')
const authenticate = require('../middleware/authMiddleware')
const authorizeAdmin = require('../middleware/authorizeAdmin')

async function adminUserRoutes(fastify, options) {
  fastify.get('/admin/users', {
    schema: {
      description: 'Get all users',
      tags: ['admin', 'users'],
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              admin: { type: 'boolean' }
            }
          }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminUserController.getUsers
  })

  fastify.get('/admin/users/:id', {
    schema: {
      description: 'Get user by ID',
      tags: ['admin', 'users'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            admin: { type: 'boolean' }
          }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminUserController.getUserById
  })

  fastify.post('/admin/users', {
    schema: {
      description: 'Create a new user',
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
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            admin: { type: 'boolean' }
          }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminUserController.createUser
  })

  fastify.patch('/admin/users/:id', {
    schema: {
      description: 'Update user by ID',
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
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            admin: { type: 'boolean' }
          }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminUserController.updateUser
  })

  fastify.delete('/admin/users/:id', {
    schema: {
      description: 'Delete user by ID',
      tags: ['admin', 'users'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        204: {
          type: 'null'
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminUserController.deleteUser
  })
}

module.exports = adminUserRoutes
