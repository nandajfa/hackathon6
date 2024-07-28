import React, { useState, useEffect } from 'react'
import { getUser } from '../../services/auth'
import QuizListPage from './QuizListPage'
import QuizFormModal from './QuizFormModal'
import './AdminQuizPage.css'
import axios from 'axios'

const AdminQuizPage = () => {
  const [showQuizList, setShowQuizList] = useState(false)
  const [showCreateQuizModal, setShowCreateQuizModal] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const user = getUser()
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:3003/api/users/${user.id}`,
            { withCredentials: true }
          )
          if (response.data && response.data.admin) {
            setIsAdmin(true)
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error)
        }
      }
      setLoading(false)
    }

    fetchUserData()
  }, [])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!isAdmin) {
    return <div>Você não é administrador.</div>
  }

  return (
    <div className="admin-quiz-page">
      <h1>Administração de Quizzes</h1>
      <button onClick={() => setShowQuizList(true)}>Listar Quizzes</button>
      <button onClick={() => setShowCreateQuizModal(true)}>Criar Quiz</button>

      {showQuizList && <QuizListPage />}
      {showCreateQuizModal && (
        <QuizFormModal
          closeModal={() => setShowCreateQuizModal(false)}
          mode="create"
        />
      )}
    </div>
  )
}

export default AdminQuizPage
