const { supabase } = require('../db/supabase')

async function getAllQuizzes() {
  const { data, error } = await supabase.from('quiz_questions').select('*')
  if (error) throw new Error(error.message)
  return data
}

module.exports = {
  getAllQuizzes
}
