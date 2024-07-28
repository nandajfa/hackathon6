const quizController = require('../controllers/quizController')
const authenticate = require('../middleware/authMiddleware')

async function quizRoutes(fastify) {
  fastify.get('/quizzes', {
    preHandler: authenticate,
    handler: quizController.getAllQuizzes
  })

  fastify.get('/quizzes/progress/:id', {
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
    handler: quizController.getUserProgress
  })

  fastify.get('/quizzes/questions/:id', {
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
    handler: quizController.getQuestions
  })

  fastify.post('/quizzes/submit', {
    schema: {
      body: {
        type: 'object',
        required: ['questions', 'user_id', 'points', 'level'],
        properties: {
          questions: { type: 'array', items: { type: 'object' } },
          user_id: { type: 'string' },
          points: { type: 'number' },
          level: { type: 'number' }
        }
      }
    },
    preHandler: authenticate,
    handler: quizController.submitAnswers
  })
}

module.exports = quizRoutes
