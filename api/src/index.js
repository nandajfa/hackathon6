require('dotenv').config()
const fastify = require('fastify')()
const cors = require('@fastify/cors')
const formbody = require('@fastify/formbody')
const authRoutes = require('./routes/authRoutes')
const swagger = require('./plugins/swagger')

fastify.register(cors, { origin: true })
fastify.register(formbody)
fastify.register(swagger)
fastify.register(authRoutes, { prefix: '/api' })

fastify.register(require('@fastify/cookie'), {
  secret: process.env.COOKIE_SECRET,
  parseOptions: {}
})

const start = async () => {
  try {
    await fastify.listen({
      port: 3003,
      host: '0.0.0.0'
    })
    fastify.log.info(`Server is running at http://localhost:3003`)
  } catch (err) {
    fastify.log.error(err)
    console.log(err.stack)
    process.exit(1)
  }
}

start()
