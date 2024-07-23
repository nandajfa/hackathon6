const authenticate = require('../middleware/authMiddleware')
const authorizeAdmin = require('../middleware/authorizeAdmin')
const adminQuizController = require('../controllers/adminQuizController')

async function adminQuizRoutes(fastify, options) {
  fastify.get('/admin/quizzes', {
    schema: {
      querystring: {
        type: 'object',
        required: ['table'],
        properties: {
          table: { type: 'string' }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.getAllQuizzes
  })

  fastify.get('/admin/quizzes/:id', {
    schema: {
      querystring: {
        type: 'object',
        required: ['table'],
        properties: {
          table: { type: 'string' }
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
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.getQuizById
  })

  fastify.post('/admin/quizzes', {
    schema: {
      body: {
        type: 'object',
        required: [
          'table',
          'question',
          'option1',
          'option2',
          'option3',
          'answer'
        ],
        properties: {
          table: { type: 'string' },
          question: { type: 'string' },
          option1: { type: 'string' },
          option2: { type: 'string' },
          option3: { type: 'string' },
          answer: { type: 'string' }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.createQuiz
  })

  fastify.put('/admin/quizzes/:id', {
    schema: {
      body: {
        type: 'object',
        required: [
          'table',
          'question',
          'option1',
          'option2',
          'option3',
          'answer'
        ],
        properties: {
          table: { type: 'string' },
          question: { type: 'string' },
          option1: { type: 'string' },
          option2: { type: 'string' },
          option3: { type: 'string' },
          answer: { type: 'string' }
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
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.updateQuiz
  })

  fastify.delete('/admin/quizzes/:id', {
    schema: {
      body: {
        type: 'object',
        required: ['table'],
        properties: {
          table: { type: 'string' }
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
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.deleteQuiz
  })
}

module.exports = adminQuizRoutes
