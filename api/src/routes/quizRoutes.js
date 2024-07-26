const quizController = require('../controllers/quizController')

async function quizRoutes(fastify) {
  fastify.get('/quizzes', {
    handler: quizController.getAllQuizzes
  })
}

module.exports = quizRoutes
