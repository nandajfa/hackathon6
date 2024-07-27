const { getRankingFromDB } = require('../services/rankingService')

async function getRanking(req, reply) {
  try {
    const ranking = await getRankingFromDB()
    reply.send(ranking)
  } catch (error) {
    console.error(error)
    reply.status(500).send({ error: error.message })
  }
}

module.exports = { getRanking }
