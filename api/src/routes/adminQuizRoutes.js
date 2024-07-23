const authenticate = require('../middleware/authMiddleware')
const authorizeAdmin = require('../middleware/adminMiddleware')
const adminQuizController = require('../controllers/adminQuizController')

async function adminQuizRoutes(fastify, options) {
  fastify.get('/api/admin/quizzes', {
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.getAllQuizzes
  })

  fastify.get('/api/admin/quizzes/:id', {
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.getQuizById
  })

  fastify.post('/api/admin/quizzes', {
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.createQuiz
  })

  fastify.put('/api/admin/quizzes/:id', {
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.updateQuiz
  })

  fastify.delete('/api/admin/quizzes/:id', {
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.deleteQuiz
  })
}

module.exports = adminQuizRoutes
