const authenticate = require('../middleware/authMiddleware')
const rankingController = require('../controllers/rankingController')

async function rankingRoutes(fastify) {
  fastify.get('/ranking', {
    preHandler: authenticate,
    handler: rankingController.getRanking
  })
}

module.exports = rankingRoutes
