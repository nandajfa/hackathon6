const authenticate = require('../middleware/authMiddleware')
const rankingController = require('../controllers/rankingController')

async function rankingRoutes(fastify) {
  fastify.get('/ranking', {
    schema: {
      description:
        'Obtém o ranking de todos os usuários baseado em seus pontos.',
      response: {
        200: {
          description: 'Lista de rankings de usuários',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              points: { type: 'number' },
              level: { type: 'number' }
            }
          }
        }
      }
    },
    preHandler: authenticate,
    handler: rankingController.getRanking
  })
}

module.exports = rankingRoutes
