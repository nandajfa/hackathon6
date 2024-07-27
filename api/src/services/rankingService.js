const { supabase } = require('../db/supabase')

async function getRankingFromDB() {
  const { data, error } = await supabase
    .from('users')
    .select('name, points, level')
    .order('points', { ascending: false })
    .order('level', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

module.exports = { getRankingFromDB }
