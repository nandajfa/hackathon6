const authenticate = require('../middleware/authMiddleware')
const authorizeAdmin = require('../middleware/authorizeAdmin')
const adminQuizController = require('../controllers/adminQuizController')

async function adminQuizRoutes(fastify, options) {
  fastify.get('/admin/quizzes', {
    description: 'Obtém uma lista de todos os quizzes disponíveis.',
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.getAllQuizzes
  })

  fastify.get('/admin/quizzes/:id', {
    description: 'Obtém os detalhes de um quiz específico usando o ID.',
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.getQuizById
  })

  fastify.post('/admin/quizzes', {
    schema: {
      description: 'Cria um novo quiz com as informações fornecidas.',
      body: {
        type: 'object',
        required: [
          'question',
          'option1',
          'option2',
          'option3',
          'answer',
          'difficulty'
        ],
        properties: {
          question: { type: 'string', description: 'Pergunta do quiz' },
          option1: {
            type: 'string',
            description: 'Primeira opção de resposta'
          },
          option2: { type: 'string', description: 'Segunda opção de resposta' },
          option3: {
            type: 'string',
            description: 'Terceira opção de resposta'
          },
          answer: { type: 'string', description: 'Resposta correta' },
          difficulty: { type: 'string', description: 'Dificuldade do quiz' }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.createQuiz
  })

  fastify.put('/admin/quizzes/:id', {
    schema: {
      description: 'Atualiza um quiz existente com as informações fornecidas.',
      body: {
        type: 'object',
        required: [
          'question',
          'option1',
          'option2',
          'option3',
          'answer',
          'difficulty'
        ],
        properties: {
          question: { type: 'string', description: 'Pergunta do quiz' },
          option1: {
            type: 'string',
            description: 'Primeira opção de resposta'
          },
          option2: { type: 'string', description: 'Segunda opção de resposta' },
          option3: {
            type: 'string',
            description: 'Terceira opção de resposta'
          },
          answer: { type: 'string', description: 'Resposta correta' },
          difficulty: { type: 'string', description: 'Dificuldade do quiz' }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.updateQuiz
  })

  fastify.delete('/admin/quizzes/:id', {
    schema: {
      description: 'Deleta um quiz existente pelo ID fornecido.',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      }
    },
    preHandler: [authenticate, authorizeAdmin],
    handler: adminQuizController.deleteQuiz
  })
}

module.exports = adminQuizRoutes
