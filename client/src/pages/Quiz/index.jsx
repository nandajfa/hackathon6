import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Modal, Radio, Button, Row, Col } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLevelUpAlt, faCoins } from '@fortawesome/free-solid-svg-icons'
import './style.css'

const QuizCard = ({ title, difficulty, onClick }) => {
  return (
    <div className="quiz-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{difficulty}</p>
    </div>
  )
}

const QuizContainer = () => {
  const [level, setLevel] = useState(1)
  const [points, setPoints] = useState(0)
  const [questions, setQuestions] = useState([])
  const [currentQuestions, setCurrentQuestions] = useState([])
  const [currentQuestionsIndex, setCurrentQuestionsIndex] = useState(null)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [answeredCards, setAnsweredCards] = useState(new Set())
  const [shuffledOptions, setShuffledOptions] = useState({})

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3003/api/quizzes`, {
        withCredentials: true
      })

      const groupedQuestions = { easy: [], medium: [], difficult: [] }
      response.data.forEach(q => groupedQuestions[q.difficulty].push(q))

      const formattedQuestions = []
      Object.keys(groupedQuestions).forEach(difficulty => {
        for (let i = 0; i < groupedQuestions[difficulty].length; i += 5) {
          formattedQuestions.push({
            title: `Quiz ${formattedQuestions.length + 1}`,
            difficulty: difficulty,
            questions: groupedQuestions[difficulty].slice(i, i + 5)
          })
        }
      })

      setQuestions(formattedQuestions)
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  }, [])

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const handleCardClick = index => {
    if (answeredCards.has(index)) return
    const selectedQuestions = questions[index].questions
    setCurrentQuestions(selectedQuestions)
    setCurrentQuestionsIndex(index)
    setSelectedAnswers({})
    openModalWithShuffledOptions(selectedQuestions)
  }

  const handleAnswerChange = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  const handleModalClose = () => {
    // setCurrentQuestions([])
    // setCurrentQuestionsIndex(null)
    setIsModalVisible(false)
    setSelectedAnswers({})
  }

  // const submitAnswers = async () => {
  //   const answers = currentQuestions.map((q, index) => ({
  //     questionId: q.id,
  //     selectedAnswer: selectedAnswers[index]
  //   }))

  //   try {
  //     const response = await axios.post('/api/quizzes/submit', { answers })
  //     const correctAnswers = response.data.correct
  //     if (correctAnswers >= 3) {
  //       setPoints(prevPoints => prevPoints + 20)
  //       if ((points + 20) % 100 === 0) {
  //         setLevel(prevLevel => prevLevel + 1)
  //         await axios.put('/api/users/updateLevel', { level: level + 1 })
  //       }
  //       setAnsweredCards(prev => new Set(prev).add(currentQuestionsIndex))
  //     }
  //     handleModalClose()
  //     alert(`You got ${correctAnswers} correct answers!`)
  //   } catch (error) {
  //     console.error('Error submitting answers:', error)
  //   }
  // }

  const handleSubmit = async () => {
    const answers = currentQuestions.map(question => ({
      question_id: question.id,
      user_answer: selectedAnswers[question.id],
      difficulty: question.difficulty
    }))

    try {
      const response = await axios.post('/api/quizzes/submit', { answers })
      const correctAnswers = response.data.correct

      if (correctAnswers >= 3) {
        const newPoints = points + 20
        setPoints(newPoints)

        if (newPoints % 100 === 0) {
          const newLevel = level + 1
          setLevel(newLevel)
          await axios.put('/api/users/updateLevel', { level: newLevel })
        }

        setAnsweredCards(prev => new Set(prev).add(currentQuestionsIndex))
      }

      handleModalClose()
      alert(`You got ${correctAnswers} correct answers!`)
    } catch (error) {
      console.error('Error submitting answers:', error)
    }
  }

  const shuffleOptions = question => {
    const options = [
      question.option1,
      question.option2,
      question.option3,
      question.answer
    ]
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }
    return options
  }

  const openModalWithShuffledOptions = questions => {
    const shuffled = {}
    questions.forEach(question => {
      shuffled[question.id] = shuffleOptions(question)
    })
    setShuffledOptions(shuffled)
    setIsModalVisible(true)
  }

  return (
    <div className="quiz-container">
      <div className="progress">
        <p>
          <FontAwesomeIcon icon={faLevelUpAlt} /> Level: {level}
        </p>
        <p>
          {' '}
          <FontAwesomeIcon icon={faCoins} /> Points: {points}
        </p>
      </div>
      <div className="quiz-list">
        {questions.map((quiz, index) => (
          <QuizCard
            key={index}
            title={quiz.title}
            difficulty={quiz.difficulty}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <Modal
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        }
      >
        {currentQuestions.map((question, qIndex) => {
          const options = shuffledOptions[question.id]
          return (
            <div key={qIndex} style={{ marginBottom: '20px' }}>
              <Row>
                <Col span={24}>
                  <p>
                    <strong>
                      {qIndex + 1}. {question.question}
                    </strong>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Radio.Group
                    onChange={e =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    value={selectedAnswers[question.id]}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    {options.map((option, oIndex) => (
                      <Radio key={oIndex} value={option}>
                        {option}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Col>
              </Row>
            </div>
          )
        })}
      </Modal>
    </div>
  )
}

export default QuizContainer
