const quizService = require('../services/adminQuizService')

async function getAllQuizzes(request, reply) {
  try {
    const { table } = request.query
    const quizzes = await quizService.getAllQuizzes(table)
    reply.send(quizzes)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function getQuizById(request, reply) {
  try {
    const { table } = request.query
    const { id } = request.params
    const quiz = await quizService.getQuizById(id, table)
    reply.send(quiz)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function createQuiz(request, reply) {
  try {
    const { table } = request.body
    const quizData = {
      question: request.body.question,
      option1: request.body.option1,
      option2: request.body.option2,
      option3: request.body.option3,
      answer: request.body.answer
    }
    const newQuiz = await quizService.createQuiz(quizData, table)
    reply.code(201).send(newQuiz)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function updateQuiz(request, reply) {
  try {
    const { table } = request.body
    const { id } = request.params
    const quizData = {
      question: request.body.question,
      option1: request.body.option1,
      option2: request.body.option2,
      option3: request.body.option3,
      answer: request.body.answer
    }
    const updatedQuiz = await quizService.updateQuiz(id, quizData, table)
    reply.send(updatedQuiz)
  } catch (error) {
    reply.code(500).send({ error: error.message })
  }
}

async function deleteQuiz(request, reply) {
  try {
    const { table } = request.body
    const { id } = request.params
    const deletedQuiz = await quizService.deleteQuiz(id, table)
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
