import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './QuizFormModal.css'

const QuizFormModal = ({ closeModal, quiz, mode }) => {
  const [question, setQuestion] = useState('')
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [answer, setAnswer] = useState('')
  const [difficulty, setDifficulty] = useState('')

  useEffect(() => {
    if (quiz) {
      setQuestion(quiz.question)
      setOption1(quiz.option1)
      setOption2(quiz.option2)
      setOption3(quiz.option3)
      setAnswer(quiz.answer)
      setDifficulty(quiz.difficulty)
    }
  }, [quiz])

  const handleSubmit = async e => {
    e.preventDefault()
    const payload = { question, option1, option2, option3, answer, difficulty }

    if (mode === 'edit') {
      await axios.put(
        `http://localhost:3003/api/admin/quizzes/${quiz.id}`,
        payload,
        { withCredentials: true }
      )
    } else {
      await axios.post('http://localhost:3003/api/admin/quizzes', payload, {
        withCredentials: true
      })
    }

    closeModal()
  }

  return (
    <div className="quiz-form-modal">
      <form onSubmit={handleSubmit}>
        <h2>{mode === 'edit' ? 'Editar Quiz' : 'Criar Quiz'}</h2>
        <label>Pergunta:</label>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <label>Opção 1:</label>
        <input
          type="text"
          value={option1}
          onChange={e => setOption1(e.target.value)}
        />
        <label>Opção 2:</label>
        <input
          type="text"
          value={option2}
          onChange={e => setOption2(e.target.value)}
        />
        <label>Opção 3:</label>
        <input
          type="text"
          value={option3}
          onChange={e => setOption3(e.target.value)}
        />
        <label>Resposta:</label>
        <input
          type="text"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
        <label>Dificuldade:</label>
        <input
          type="text"
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
        />
        <button type="submit">
          {mode === 'edit' ? 'Atualizar Quiz' : 'Criar Quiz'}
        </button>
      </form>
      <button onClick={closeModal}>Fechar</button>
    </div>
  )
}

export default QuizFormModal
