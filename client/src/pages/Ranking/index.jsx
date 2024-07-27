import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'

const Ranking = () => {
  const [ranking, setRanking] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get('/api/ranking')
        setRanking(response.data)
      } catch (err) {
        setError('Erro ao carregar ranking.')
      } finally {
        setLoading(false)
      }
    }

    fetchRanking()
  }, [])
  return (
    <div className="ranking-container">
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <table className="ranking-table">
          <thead>
            <tr>
              <th>Posição</th>
              <th>Usuário</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Ranking
