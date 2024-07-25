const authenticate = require('../middleware/authMiddleware')
const authorizeAdmin = require('../middleware/authorizeAdmin')
const adminQuizController = require('../controllers/adminQuizController')

async function adminQuizRoutes(fastify, options) {
  fastify.get('/admin/quizzes', {
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.getAllQuizzes
  })

  fastify.get('/admin/quizzes/:id', {
    schema: {
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
          'question',
          'option1',
          'option2',
          'option3',
          'answer',
          'difficulty'
        ],
        properties: {
          question: { type: 'string' },
          option1: { type: 'string' },
          option2: { type: 'string' },
          option3: { type: 'string' },
          answer: { type: 'string' },
          difficulty: { type: 'string' }
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
          'question',
          'option1',
          'option2',
          'option3',
          'answer',
          'difficulty'
        ],
        properties: {
          question: { type: 'string' },
          option1: { type: 'string' },
          option2: { type: 'string' },
          option3: { type: 'string' },
          answer: { type: 'string' },
          difficulty: { type: 'string' }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.updateQuiz
  })

  fastify.delete('/admin/quizzes/:id', {
    schema: {
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
