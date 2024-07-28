const { supabase } = require('../db/supabase')


async function getAllQuizzes() {
  const { data, error } = await supabase.from('quiz_questions').select('*')
  if (error) throw new Error(error.message)
  return data
}

async function getQuizById(id) {
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw new Error(error.message)
  return data
}

async function createQuiz(quizData) {
  const { data, error } = await supabase
    .from('quiz_questions')
    .insert([quizData])
  if (error) throw new Error(error.message)
  return data
}

async function updateQuiz(id, quizData) {
  const { data, error } = await supabase
    .from('quiz_questions')
    .update(quizData)
    .eq('id', id)

  if (error) throw new Error(error.message)
  return data
}

async function deleteQuiz(id) {
  console.log(id)
  const { data, error } = await supabase
    .from('quiz_questions')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  console.log(data)
  return data
}

module.exports = {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz
}
