const fastifySwagger = require('@fastify/swagger')

async function swagger(fastify, options) {
  fastify.register(fastifySwagger, {
    routePrefix: '/api/documentation',
    swagger: {
      info: {
        title: 'Quiz App API',
        description: 'API documentation for the Quiz App',
        version: '1.0.0'
      },
      host: 'localhost:3003',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    },
    exposeRoute: true
  })
}

module.exports = swagger
