const quizService = require('../services/adminQuizService')

async function getAllQuizzes(request, reply) {
  try {
    const quizzes = await quizService.getAllQuizzes()
    reply.send(quizzes)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function getQuizById(request, reply) {
  try {
    const { id } = request.params
    const quiz = await quizService.getQuizById(id)
    reply.send(quiz)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function createQuiz(request, reply) {
  try {
    const quizData = request.body
    const newQuiz = await quizService.createQuiz(quizData)
    reply.code(201).send(newQuiz)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function updateQuiz(request, reply) {
  try {
    const quizData = request.body
    const { id } = request.params
    const updatedQuiz = await quizService.updateQuiz(id, quizData)
    reply.send(updatedQuiz)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function deleteQuiz(request, reply) {
  try {
    const { id } = request.params
    const deletedQuiz = await quizService.deleteQuiz(id)
    reply.send(deletedQuiz)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

module.exports = {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz
}
