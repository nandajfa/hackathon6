const quizService = require('../services/quizService')

async function getAllQuizzes(request, reply) {
  try {
    const quizzes = await quizService.getAllQuizzes()
    reply.send(quizzes)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

module.exports = {
  getAllQuizzes
}
