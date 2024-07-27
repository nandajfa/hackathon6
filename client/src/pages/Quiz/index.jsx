// import React, { useState, useEffect, useCallback } from 'react'
// import axios from 'axios'
// import { Modal, Radio, Button, Row, Col } from 'antd'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faLevelUpAlt, faCoins } from '@fortawesome/free-solid-svg-icons'
// import { getUser } from '../../services/auth'
// import './style.css'

// const QuizCard = ({ title, difficulty, onClick, answered }) => {
//   return (
//     <div
//       className={`quiz-card ${answered ? 'answered' : ''}`}
//       onClick={onClick}
//     >
//       <h3>{title}</h3>
//       <p>{difficulty}</p>
//     </div>
//   )
// }

// const QuizContainer = () => {
//   const [level, setLevel] = useState(1)
//   const [points, setPoints] = useState(0)
//   const [questions, setQuestions] = useState([])
//   const [currentQuestions, setCurrentQuestions] = useState([])
//   const [currentQuestionsIndex, setCurrentQuestionsIndex] = useState(null)
//   const [selectedAnswers, setSelectedAnswers] = useState({})
//   const [isModalVisible, setIsModalVisible] = useState(false)
//   const [answeredCards, setAnsweredCards] = useState(new Set())
//   const [shuffledOptions, setShuffledOptions] = useState({})

//   const user = getUser()

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3003/api/quizzes/progress/${user.id}`,
//           {
//             withCredentials: true
//           }
//         )

//         const userProgress = response.data
//         if (userProgress) {
//           setPoints(userProgress.points)
//           setLevel(userProgress.level)
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error)
//       }
//     }

//     if (user?.id) {
//       fetchUserData()
//     }
//   }, [user?.id])

//   const fetchQuestions = useCallback(async () => {
//     try {
//       const response = await axios.get(`http://localhost:3003/api/quizzes`, {
//         withCredentials: true
//       })

//       const groupedQuestions = { easy: [], medium: [], difficult: [] }
//       response.data.forEach(q => groupedQuestions[q.difficulty].push(q))

//       const formattedQuestions = []
//       let currentCard = { title: '', difficulty: '', questions: [] }
//       let cardCounter = 1

//       Object.keys(groupedQuestions).forEach(difficulty => {
//         groupedQuestions[difficulty].forEach((question, index) => {
//           currentCard.questions.push(question)

//           if (currentCard.questions.length === 5) {
//             currentCard.title = `Quiz ${cardCounter++}`
//             currentCard.difficulty = difficulty
//             formattedQuestions.push(currentCard)
//             currentCard = { title: '', difficulty: '', questions: [] }
//           }

//           if (
//             index === groupedQuestions[difficulty].length - 1 &&
//             currentCard.questions.length > 0
//           ) {
//             if (currentCard.questions.length >= 3) {
//               currentCard.title = `Quiz ${cardCounter++}`
//               currentCard.difficulty = difficulty
//               formattedQuestions.push(currentCard)
//             } else if (formattedQuestions.length > 0) {
//               const lastCard = formattedQuestions[formattedQuestions.length - 1]
//               if (
//                 lastCard.questions.length + currentCard.questions.length <=
//                 5
//               ) {
//                 lastCard.questions.push(...currentCard.questions)
//               } else {
//                 const remainingQuestions = 5 - lastCard.questions.length
//                 lastCard.questions.push(
//                   ...currentCard.questions.slice(0, remainingQuestions)
//                 )
//                 currentCard.questions =
//                   currentCard.questions.slice(remainingQuestions)
//                 if (currentCard.questions.length >= 3) {
//                   currentCard.title = `Quiz ${cardCounter++}`
//                   currentCard.difficulty = difficulty
//                   formattedQuestions.push(currentCard)
//                 }
//               }
//             }
//           }
//         })
//       })

//       console.log(formattedQuestions)
//       setQuestions(formattedQuestions)
//     } catch (error) {
//       console.error('Error fetching questions:', error)
//     }
//   }, [])

//   useEffect(() => {
//     fetchQuestions()
//   }, [fetchQuestions])

//   const handleCardClick = index => {
//     if (answeredCards.has(index)) return
//     const selectedQuestions = questions[index].questions
//     setCurrentQuestions(selectedQuestions)
//     setCurrentQuestionsIndex(index)
//     setSelectedAnswers({})
//     openModalWithShuffledOptions(selectedQuestions)
//   }

//   const handleAnswerChange = (questionId, answer) => {
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [questionId]: answer
//     }))
//   }

//   const handleModalClose = () => {
//     setIsModalVisible(false)
//     setSelectedAnswers({})
//   }

//   const handleSubmit = async () => {
//     const answers = currentQuestions.map(question => ({
//       question_id: question.id,
//       user_answer: selectedAnswers[question.id],
//       difficulty: question.difficulty
//     }))

//     const payload = {
//       answers,
//       user_id: user.id
//     }

//     try {
//       const response = await axios.post(
//         'http://localhost:3003/api/quizzes/submit',
//         payload,
//         { withCredentials: true }
//       )
//       const correctAnswers = response.data.correct

//       setAnsweredCards(prev => new Set(prev).add(currentQuestionsIndex))

//       handleModalClose()
//       alert(`You got ${correctAnswers} correct answers!`)
//     } catch (error) {
//       console.error('Error submitting answers:', error)
//       alert(
//         'There was an error submitting your answers. Please try again later.'
//       )
//     }
//   }

//   const shuffleOptions = question => {
//     const options = [
//       question.option1,
//       question.option2,
//       question.option3,
//       question.answer
//     ]
//     for (let i = options.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1))
//       ;[options[i], options[j]] = [options[j], options[i]]
//     }
//     return options
//   }

//   const openModalWithShuffledOptions = questions => {
//     const shuffled = {}
//     questions.forEach(question => {
//       shuffled[question.id] = shuffleOptions(question)
//     })
//     setShuffledOptions(shuffled)
//     setIsModalVisible(true)
//   }

//   return (
//     <div className="quiz-container">
//       <div className="progress">
//         <p>
//           <FontAwesomeIcon icon={faLevelUpAlt} /> Level: {level}
//         </p>
//         <p>
//           <FontAwesomeIcon icon={faCoins} /> Points: {points}
//         </p>
//       </div>
//       <div className="quiz-list">
//         {questions.map((quiz, index) => (
//           <QuizCard
//             key={index}
//             title={quiz.title}
//             difficulty={quiz.difficulty}
//             onClick={() => handleCardClick(index)}
//             answered={answeredCards.has(index)}
//           />
//         ))}
//       </div>

//       <Modal
//         open={isModalVisible}
//         onCancel={handleModalClose}
//         footer={
//           <Button type="primary" onClick={handleSubmit}>
//             Submit
//           </Button>
//         }
//       >
//         {currentQuestions.map((question, qIndex) => {
//           const options = shuffledOptions[question.id]
//           return (
//             <div key={qIndex} style={{ marginBottom: '20px' }}>
//               <Row>
//                 <Col span={24}>
//                   <p>
//                     <strong>
//                       {qIndex + 1}. {question.question}
//                     </strong>
//                   </p>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col span={24}>
//                   <Radio.Group
//                     onChange={e =>
//                       handleAnswerChange(question.id, e.target.value)
//                     }
//                     value={selectedAnswers[question.id]}
//                     style={{ display: 'flex', flexDirection: 'column' }}
//                   >
//                     {options.map((option, oIndex) => (
//                       <Radio key={oIndex} value={option}>
//                         {option}
//                       </Radio>
//                     ))}
//                   </Radio.Group>
//                 </Col>
//               </Row>
//             </div>
//           )
//         })}
//       </Modal>
//     </div>
//   )
// }

// export default QuizContainer
import { getUser } from '../../services/auth'
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Quiz from 'react-quiz-component'
import { Button, Modal } from 'antd'
import './style.css'

const QuizContainer = () => {
  const [level, setLevel] = useState(1)
  const [points, setPoints] = useState(0)
  const [quizzes, setQuizzes] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [modalQuizVisible, setModalQuizVisible] = useState(false)
  const [quizResult, setQuizResult] = useState(null)
  const user = getUser()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/quizzes/progress/${user.id}`,
          {
            withCredentials: true
          }
        )
        const userProgress = response.data
        if (userProgress) {
          setPoints(userProgress.points)
          setLevel(userProgress.level)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    if (user?.id) {
      fetchUserData()
    }
  }, [user?.id])

  const getQuestions = useCallback(async () => {
    try {
      const { data: answeredQuestions } = await axios.get(
        `http://localhost:3003/api/quizzes/questions/${user?.id}`,
        {
          withCredentials: true
        }
      )

      const { data: allQuestions } = await axios.get(
        `http://localhost:3003/api/quizzes`,
        {
          withCredentials: true
        }
      )

      if (
        !Array.isArray(answeredQuestions.data) ||
        answeredQuestions.data.length === 0
      ) {
        return allQuestions
      }

      const answeredQuestionIds = answeredQuestions.data.map(q => q.question_id)

      const unansweredQuestions = allQuestions.filter(
        question => !answeredQuestionIds.includes(question.id)
      )

      return unansweredQuestions
    } catch (error) {
      console.error('Error fetching questions:', error)
      return []
    }
  }, [user?.id])

  const fetchQuestions = useCallback(async () => {
    try {
      const questions = await getQuestions()
      const groupedQuestions = { easy: [], medium: [], difficult: [] }
      questions.forEach(q => groupedQuestions[q.difficulty].push(q))

      const formattedQuizzes = []
      let currentQuiz = { quizTitle: '', quizSynopsis: '', questions: [] }
      let quizCounter = 1

      Object.keys(groupedQuestions).forEach(difficulty => {
        groupedQuestions[difficulty].forEach((question, index) => {
          currentQuiz.questions.push({
            question: question.question,
            questionType: 'text',
            answerSelectionType: 'single',
            answers: [
              question.option1,
              question.option2,
              question.option3,
              question.answer
            ],
            correctAnswer: 4,
            messageForCorrectAnswer: 'Resposta certa, parabéns! :)',
            messageForIncorrectAnswer: 'Não foi dessa vez. :(',
            explanation: '',
            point: '20'
          })

          if (currentQuiz.questions.length === 5) {
            currentQuiz.quizTitle = `Quiz ${quizCounter++}`
            currentQuiz.quizSynopsis = `${difficulty}`
            formattedQuizzes.push(currentQuiz)
            currentQuiz = { quizTitle: '', quizSynopsis: '', questions: [] }
          }

          if (
            index === groupedQuestions[difficulty].length - 1 &&
            currentQuiz.questions.length > 0
          ) {
            if (currentQuiz.questions.length >= 3) {
              currentQuiz.quizTitle = `Quiz ${quizCounter++}`
              currentQuiz.quizSynopsis = `${difficulty}`
              formattedQuizzes.push(currentQuiz)
            } else if (formattedQuizzes.length > 0) {
              const lastQuiz = formattedQuizzes[formattedQuizzes.length - 1]
              if (
                lastQuiz.questions.length + currentQuiz.questions.length <=
                5
              ) {
                lastQuiz.questions.push(...currentQuiz.questions)
              } else {
                const remainingQuestions = 5 - lastQuiz.questions.length
                lastQuiz.questions.push(
                  ...currentQuiz.questions.slice(0, remainingQuestions)
                )
                currentQuiz.questions =
                  currentQuiz.questions.slice(remainingQuestions)
                if (currentQuiz.questions.length >= 3) {
                  currentQuiz.quizTitle = `Quiz ${quizCounter++}`
                  currentQuiz.quizSynopsis = `${difficulty}`
                  formattedQuizzes.push(currentQuiz)
                }
              }
            }
          }
        })
      })

      setQuizzes(formattedQuizzes)
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  }, [getQuestions])

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const customResultPage = () => {
    return (
      <div>
        <h1>Quiz finalizado</h1>
      </div>
    )
  }

  const handleQuizComplete = async result => {
    const questions = result.questions.map(question => ({
      question: question.question
    }))
    const correctAnswers = result.numberOfCorrectAnswers
    const quizPoints = correctAnswers >= 3 ? 20 : 0

    setQuizResult({
      questions,
      correctAnswers,
      totalPoints: quizPoints
    })
  }

  const handleSubmit = async () => {
    try {
      if (quizResult.correctAnswers >= 3) {
        const updatedPoints = points + quizResult.totalPoints
        const updatedLevel = Math.floor(updatedPoints / 100) + 1

        setPoints(updatedPoints)
        setLevel(updatedLevel)
        const questions = quizResult.questions
        const payload = {
          questions,
          user_id: user.id,
          points: updatedPoints,
          level: updatedLevel
        }

        const response = axios.post(
          'http://localhost:3003/api/quizzes/submit',
          payload,
          { withCredentials: true }
        )
        console.log('response', response.data.correct)
        setModalQuizVisible(false)
      }
    } catch (error) {
      console.error('Error updating user progress:', error)
    }
  }

  const openQuizModal = useCallback(quiz => {
    setSelectedQuiz(quiz)
    setModalQuizVisible(true)
  }, [])

  return (
    <div className="quiz-container">
      <div className="progress">
        <p>Level: {level}</p>
        <p>Points: {points}</p>
      </div>
      <div className="quiz-list">
        {quizzes.map(quiz => (
          <div key={quiz.quizTitle} className="quiz-card">
            <Button
              className="modal_button"
              onClick={() => openQuizModal(quiz)}
            >
              Open Quiz {quizzes.indexOf(quiz) + 1}
            </Button>
          </div>
        ))}
      </div>

      <Modal
        open={modalQuizVisible}
        onCancel={() => setModalQuizVisible(false)}
        footer={[
          <Button
            className="modal_button"
            key="submit"
            type="primary"
            onClick={handleSubmit}
          >
            Enviar respostas
          </Button>
        ]}
      >
        {selectedQuiz && (
          <Quiz
            quiz={selectedQuiz}
            shuffle={true}
            shuffleAnswer={true}
            showInstantFeedback={true}
            customResultPage={customResultPage}
            showDefaultResult={false}
            onComplete={handleQuizComplete}
          />
        )}
      </Modal>
    </div>
  )
}

export default QuizContainer
