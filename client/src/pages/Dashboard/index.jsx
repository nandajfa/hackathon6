import React, { useState, useEffect } from 'react'
import { getUser } from '../../services/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLevelUpAlt,
  faCoins,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './style.css'

const Dashboard = () => {
  const [level, setLevel] = useState(1)
  const [points, setPoints] = useState(0)
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

  const pointsForNextLevel = level * 100
  const pointsToNextLevel = pointsForNextLevel - points

  return (
    <div className="dashboard-container">
      <div className="user-info">
        <FontAwesomeIcon icon={faUserCircle} size="3x" className="avatar" />
        <span className="user-name">{user.name}</span>
      </div>
      <hr className="divider" />
      <div className="cards-container">
        <div className="card">
          <h3>Você está no level</h3>
          <p>
            {' '}
            <FontAwesomeIcon className="icon" icon={faLevelUpAlt} />
            {level}
          </p>
        </div>
        <div className="card">
          <h3>Você tem </h3>
          <p>
            {' '}
            <FontAwesomeIcon className="icon" icon={faCoins} />
            {points} pontos
          </p>
        </div>
        <div className="card">
          <h3>Pontos para o Próximo Nível</h3>
          <p>{pointsToNextLevel >= 0 ? pointsToNextLevel : 0}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
