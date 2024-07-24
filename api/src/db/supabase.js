require('dotenv').config()

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const findUserByEmail = async email => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single()

    if (error && error.code === 'PGRST116') {
      return null
    } else if (error) {
      throw error
    }

    return data
  } catch (error) {
    throw error
  }
}

module.exports = {
  supabase,
  findUserByEmail
}
