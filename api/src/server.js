require('dotenv').config()
const fastify = require('fastify')()
const cors = require('@fastify/cors')
const formbody = require('@fastify/formbody')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminQuizRoutes')
const quizRoutes = require('./routes/quizRoutes')
const rankingRoutes = require('./routes/rankingRoutes')
const adminUserRoutes = require('./routes/adminUserRoutes')

fastify.register(require('@fastify/swagger'), {
  openapi: {
    info: {
      title: 'Quiz App API',
      description: 'Documentação da API do app de Aprendizado Gamificado',
      version: '0.0.1'
    },
    servers: [
      {
        url: 'http://localhost:3003',
        description: 'Servidor de Desenvolvimento'
      }
    ]
  }
})

fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
})

fastify.register(cors, {
  origin: (origin, cb) => {
    cb(null, true)
  },
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
})

fastify.register(formbody)
fastify.register(authRoutes, { prefix: '/api' })
fastify.register(adminRoutes, { prefix: '/api' })
fastify.register(adminUserRoutes, { prefix: '/api' })
fastify.register(quizRoutes, { prefix: '/api' })
fastify.register(rankingRoutes, { prefix: '/api' })

fastify.register(require('@fastify/cookie'), {
  secret: process.env.COOKIE_SECRET,
  parseOptions: {}
})

const start = async () => {
  try {
    await fastify.listen({
      port: process.env.PORT,
      host: '0.0.0.0'
    })
    fastify.log.info(`Server is running at http://localhost:3003`)
  } catch (err) {
    fastify.log.error(err.message)
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
