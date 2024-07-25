const quizController = require('../controllers/quizController')

async function quizRoutes(fastify) {
  fastify.get('/quizzes', {
    schema: {
      querystring: {
        difficulty: { type: 'string' }
      }
    },
    handler: quizController.getQuizzesByDifficulty
  })
}

module.exports = quizRoutes
