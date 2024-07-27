const quizController = require('../controllers/quizController')
const authenticate = require('../middleware/authMiddleware')

async function quizRoutes(fastify) {
  fastify.get('/quizzes', {
    preHandler: authenticate,
    handler: quizController.getAllQuizzes
  })

  fastify.get('/quizzes/progress/:id', {
    preHandler: authenticate,
    handler: quizController.getUserProgress
  })

  fastify.get('/quizzes/questions/:id', {
    preHandler: authenticate,
    handler: quizController.getQuestions
  })

  fastify.post('/quizzes/submit', {
    preHandler: authenticate,
    handler: quizController.submitAnswers
  })
}

module.exports = quizRoutes
