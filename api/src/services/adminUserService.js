const { supabase } = require('../db/supabase')

async function getUsers() {
  const { data, error } = await supabase.from('users').select('*')
  if (error) throw new Error(error.message)
  return data
}

async function getUserById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw new Error(error.message)
  return data
}

async function createUser(user) {
  const { data, error } = await supabase.from('users').insert([user]).single()
  if (error) throw new Error(error.message)
  return data
}

async function updateUser(id, user) {
  console.log(user)
  const { data, error } = await supabase
    .from('users')
    .update(user)
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
  return data
}

async function deleteUser(id) {
  const { error } = await supabase.from('users').delete().eq('id', id)

  if (error) throw new Error(error.message)
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
