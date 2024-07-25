const supabase = require('../db/supabase')

async function getQuizzesByDifficulty(difficulty) {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('difficulty', difficulty)
    .limit(5)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

module.exports = {
  getQuizzesByDifficulty
}
