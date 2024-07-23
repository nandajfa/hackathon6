const { supabase } = require('../db/supabase')

async function getAllQuizzes(table) {
  const { data, error } = await supabase.from(table).select('*')
  if (error) throw new Error(error.message)
  return data
}

async function getQuizById(id, table) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw new Error(error.message)
  return data
}

async function createQuiz(quizData, table) {
  const { data, error } = await supabase.from(table).insert([quizData])
  if (error) throw new Error(error.message)
  return data
}

async function updateQuiz(id, quizData, table) {
  const { data, error } = await supabase
    .from(table)
    .update(quizData)
    .eq('id', id)
  if (error) throw new Error(error.message)
  return data
}

async function deleteQuiz(id, table) {
  const { data, error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw new Error(error.message)
  return data
}

module.exports = {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz
}
