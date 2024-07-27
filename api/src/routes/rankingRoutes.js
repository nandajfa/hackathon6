async function quizRoutes(fastify) {
  fastify.get('/ranking', {
    preHandler: authenticate,
    handler: quizController.getAllQuizzes
  })
}

module.exports = quizRoutes
