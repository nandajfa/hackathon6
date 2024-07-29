import { getUser } from '../../services/auth'
import SuccessNotification from '../../components/Notification/SuccessNotification'
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Quiz from 'react-quiz-component'
import { Button, Modal } from 'antd'
import './style.css'
import { v4 as uuidv4 } from 'uuid'

const QuizContainer = () => {
  const [level, setLevel] = useState(1)
  const [points, setPoints] = useState(0)
  const [quizzes, setQuizzes] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [quizResult, setQuizResult] = useState(null)
  const [levelUpVisible, setLevelUpVisible] = useState(false)
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
      let currentQuiz = {
        id: uuidv4(),
        quizTitle: '',
        quizSynopsis: '',
        questions: []
      }
      let quizCounter = 1

      const finalizeCurrentQuiz = () => {
        if (currentQuiz.questions.length > 0) {
          currentQuiz.quizTitle = `Quiz ${quizCounter++}`
          formattedQuizzes.push(currentQuiz)
          currentQuiz = {
            id: uuidv4(),
            quizTitle: '',
            quizSynopsis: '',
            questions: []
          }
        }
      }

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
            messageForCorrectAnswer: 'Certo, parabéns! :)',
            messageForIncorrectAnswer: 'Não foi dessa vez. :(',
            explanation: '',
            point: '20'
          })

          if (currentQuiz.questions.length === 5) {
            finalizeCurrentQuiz()
          }

          if (index === groupedQuestions[difficulty].length - 1) {
            finalizeCurrentQuiz()
          }
        })
      })

      console.log('Formatted Quizzes:', formattedQuizzes)
      setQuizzes(formattedQuizzes)
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  }, [getQuestions])

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const handleQuizComplete = async result => {
    const questions = result.questions.map(question => ({
      question: question.question
    }))
    const correctAnswers = result.numberOfCorrectAnswers
    const quizPoints = correctAnswers >= 3 ? 20 : 0

    setQuizResult({
      questions,
      correctAnswers,
      totalQuestions: result.numberOfQuestions,
      totalPoints: quizPoints
    })
  }

  const handleSubmit = async () => {
    try {
      if (quizResult.correctAnswers >= 3) {
        const updatedPoints = points + quizResult.totalPoints
        const updatedLevel = Math.floor(updatedPoints / 100) + 1

        setPoints(updatedPoints)
        if (updatedLevel > level) {
          setLevel(updatedLevel)
          setLevelUpVisible(true)
        }
        const questions = quizResult.questions
        const payload = {
          questions,
          user_id: user.id,
          points: updatedPoints,
          level: updatedLevel
        }

        axios.post('http://localhost:3003/api/quizzes/submit', payload, {
          withCredentials: true
        })
        SuccessNotification({
          message: 'Respostas enviadas',
          description: ''
        })
        setQuizResult(null)
      }
    } catch (error) {
      console.error('Error updating user progress:', error)
    }
  }

  return (
    <div className="quiz-container">
      <h2>Quizzes</h2>
      <hr className="divider" />
      <div className="quiz-list">
        {quizzes.length === 0 ? (
          <p>Nenhum quiz disponível</p>
        ) : (
          quizzes.map((quiz, index) => (
            <div key={quiz.id} className="quiz-card">
              <Button
                className="quiz_button"
                onClick={() =>
                  setSelectedQuiz(quiz === selectedQuiz ? null : quiz)
                }
              >
                {selectedQuiz === quiz
                  ? 'Fechar Quiz'
                  : `Abrir Quiz ${index + 1}`}
              </Button>
              {selectedQuiz === quiz && (
                <div className="quiz-display">
                  <Quiz
                    quiz={selectedQuiz}
                    shuffle={true}
                    shuffleAnswer={true}
                    showInstantFeedback={true}
                    showDefaultResult={false}
                    onComplete={handleQuizComplete}
                  />
                  <button onClick={handleSubmit}>Enviar respostas</button>
                  {quizResult && (
                    <div className="quiz-result-summary">
                      <p>
                        Você acertou {quizResult.correctAnswers} de{' '}
                        {quizResult.totalQuestions} perguntas
                      </p>
                      <p>Pontuação total: {quizResult.totalPoints}</p>
                    </div>
                  )}
                  <Modal
                    open={levelUpVisible}
                    onCancel={() => setLevelUpVisible(false)}
                    footer={null}
                  >
                    <div className="level-up-modal">
                      <i className="fas fa-star level-up-icon"></i>{' '}
                      {/* Ícone de comemoração */}
                      <h2>Parabéns!</h2>
                      <p>Você subiu de nível!</p>
                      <p>Nível atual: {level}</p>
                    </div>
                  </Modal>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default QuizContainer
