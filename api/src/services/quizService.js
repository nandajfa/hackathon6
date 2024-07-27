const { supabase } = require('../db/supabase')

async function getAllQuizzes() {
  const { data, error } = await supabase.from('quiz_questions').select('*')
  if (error) throw new Error(error.message)
  return data
}

async function checkAnswersAndUpdateUser(questions, user_id, points, level) {

  const promises = questions.map(async questionObj => {
    const question = questionObj.question
    const { data, error: questionError } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('question', question)

    if (questionError) {
      throw new Error(`Error fetching question: ${questionError.message}`)
    }

    for (const questionData of data) {
      const question_id = questionData.id

      const { error: insertError } = await supabase
        .from('user_questions')
        .insert({
          user_id,
          question_id
        })

      if (insertError) {
        throw new Error(`Error inserting user_answer: ${insertError.message}`)
      }
    }
  })

  await Promise.all(promises)

  const { error: updateError } = await supabase
    .from('users')
    .update({ points: points, level: level })
    .eq('id', user_id)

  if (updateError) {
    throw new Error(`Error updating user: ${updateError.message}`)
  }

  return { correct: 'updated' }
}

async function getUserProgress(user_id) {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('points, level')
    .eq('id', user_id)
    .single()

  if (userError) {
    throw new Error(`Error fetching user: ${userError.message}`)
  }

  return {
    points: user.points,
    level: user.level
  }
}

async function getQuestions(user_id) {
  const { data, error } = await supabase
    .from('user_questions')
    .select('question_id')
    .eq('user_id', user_id)

  if (error) {
    throw new Error(`Error fetching user: ${userError.message}`)
  }

  return { data }
}

module.exports = {
  getAllQuizzes,
  checkAnswersAndUpdateUser,
  getUserProgress,
  getQuestions
}
