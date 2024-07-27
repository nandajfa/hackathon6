const quizService = require('../services/quizService')

async function getAllQuizzes(request, reply) {
  try {
    const quizzes = await quizService.getAllQuizzes()
    reply.send(quizzes)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function getUserProgress(request, reply) {
  try {
    const user_id = request.params.id

    const result = await quizService.getUserProgress(user_id)
    reply.send(result)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function getQuestions(request, reply) {
  try {
    const user_id = request.params.id
    const questions = await quizService.getQuestions(user_id)
    reply.send(questions)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function submitAnswers(request, reply) {
  try {
    const { questions, user_id, points, level } = request.body

    const result = await quizService.checkAnswersAndUpdateUser(
      questions,
      user_id,
      points,
      level
    )

    reply.send(result)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

module.exports = {
  getAllQuizzes,
  submitAnswers,
  getUserProgress,
  getQuestions
}
