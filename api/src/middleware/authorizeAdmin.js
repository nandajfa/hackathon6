require('dotenv').config()
const jwt = require('jsonwebtoken')
const { supabase } = require('../db/supabase')

async function authorizeAdmin(request, reply) {
  try {
    const token = request.cookies.token

    if (!token) {
      return reply.code(401).send({ message: 'Unauthorized' })
    }

    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      return reply.code(401).send({ message: 'Invalid token' })
    }

    const userId = decoded.id

    const { data, error } = await supabase
      .from('users')
      .select('admin')
      .eq('id', userId)
      .single()

    if (error) {
      throw new Error(`Database query error: ${error.message}`)
    }

    if (data.admin !== true) {
      return reply.code(403).send({ message: 'Forbidden' })
    }
  } catch (error) {
    reply.code(500).send({ message: `Internal Server Error: ${error.message}` })
  }
}

module.exports = authorizeAdmin
