const quizService = require('../services/quizService')

async function getQuizzesByDifficulty(request, reply) {
  try {
    const { difficulty } = request.query
    const quizzes = await quizService.getQuizzesByDifficulty(difficulty)
    reply.send(quizzes)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

module.exports = {
  getQuizzesByDifficulty
}
