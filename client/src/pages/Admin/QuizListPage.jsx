import React, { useState, useEffect } from 'react'
import axios from 'axios'
import QuizFormModal from './QuizFormModal'
import './QuizListPage.css'

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState(null)

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    const response = await axios.get(
      'http://localhost:3003/api/admin/quizzes',
      {
        withCredentials: true
      }
    )
    setQuizzes(response.data)
  }

  const handleDelete = async quizId => {
    const response = await axios.delete(
      `http://localhost:3003/api/admin/quizzes/${quizId}`,
      {
        withCredentials: true
      }
    )
    console.log('Delete response:', response)
    fetchQuizzes()
  }

  return (
    <div className="quiz-list-page">
      <h2>Lista de Quizzes</h2>
      <table>
        <thead>
          <tr>
            <th>Pergunta</th>
            <th>Opção 1</th>
            <th>Opção 2</th>
            <th>Opção 3</th>
            <th>Resposta</th>
            <th>Dificuldade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map(quiz => (
            <tr key={quiz.id}>
              <td>{quiz.question}</td>
              <td>{quiz.option1}</td>
              <td>{quiz.option2}</td>
              <td>{quiz.option3}</td>
              <td>{quiz.answer}</td>
              <td>{quiz.difficulty}</td>
              <td>
                <button onClick={() => setSelectedQuiz(quiz)}>Editar</button>
                <button onClick={() => handleDelete(quiz.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedQuiz && (
        <QuizFormModal
          closeModal={() => setSelectedQuiz(null)}
          quiz={selectedQuiz}
          mode="edit"
        />
      )}
    </div>
  )
}

export default QuizListPage
