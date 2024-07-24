import React, { useState, useEffect } from 'react'
import QuizCard from './quizCard'
import axios from 'axios'

const QuizContainer = () => {
  const [level, setLevel] = useState(1)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetchQuestions(level)
  }, [level])

  const fetchQuestions = async level => {
    const response = await axios.get(
      `/api/quizzes?difficulty=${
        level <= 5 ? 'easy' : level <= 10 ? 'medium' : 'difficult'
      }`
    )
    setQuestions(response.data)
  }

  const submitAnswers = async answers => {
    const response = await axios.post('/api/quizzes/submit', { answers })
    if (response.data.correct >= 3) {
      setLevel(prev => prev + 1)
    }
    return response.data
  }

  return (
    <div className={`quiz-container level-${level}`}>
      <QuizCard questions={questions} submitAnswers={submitAnswers} />
      <div className="progress">
        <p>Level: {level}</p>
        <p>Points: {level * 20}</p>
      </div>
    </div>
  )
}

export default QuizContainer
