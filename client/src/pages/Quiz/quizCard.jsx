import React, { useState } from 'react'

const QuizCard = ({ questions, submitAnswers }) => {
  const [answers, setAnswers] = useState({})
  const [feedback, setFeedback] = useState(null)

  const handleChange = (e, questionId) => {
    setAnswers({
      ...answers,
      [questionId]: e.target.value
    })
  }

  const handleSubmit = () => {
    const result = submitAnswers(answers)
    setFeedback(result)
  }

  return (
    <div className="quiz-card">
      {questions.map((q, index) => (
        <div key={index} className="question">
          <p>{q.question}</p>
          <input
            type="radio"
            name={`q${index}`}
            value={q.option1}
            onChange={e => handleChange(e, q.id)}
          />{' '}
          {q.option1}
          <input
            type="radio"
            name={`q${index}`}
            value={q.option2}
            onChange={e => handleChange(e, q.id)}
          />{' '}
          {q.option2}
          <input
            type="radio"
            name={`q${index}`}
            value={q.option3}
            onChange={e => handleChange(e, q.id)}
          />{' '}
          {q.option3}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Answers</button>
      {feedback && <p>{feedback.message}</p>}
    </div>
  )
}

export default QuizCard
