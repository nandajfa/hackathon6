import React, { useState, useEffect } from 'react'
import './style.css'
import { Modal } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FailureNotification from '../../components/Notification/FailureNotification'
import SuccessNotification from '../../components/Notification/SuccessNotification'
import { PoweroffOutlined } from '@ant-design/icons'
import { logout, isAuthenticated } from '../../services/auth'
import { useNavigate } from 'react-router-dom'

import {
  faAngleLeft,
  faHouse,
  faRightFromBracket,
  faAngleRight,
  faQuestionCircle,
  faTrophy,
  faUser,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons'
import { getUser } from '../../services/auth'

function Dashboard() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)

  const [nameUser, setNameUser] = useState('')

  useEffect(() => {
    const storedSelectedItem = localStorage.getItem('selectedItem')
    if (storedSelectedItem) {
      setSelectedItem(storedSelectedItem)
    }

    const checkAuth = async () => {
      try {
        const response = isAuthenticated()
        if (!response) {
          throw new Error('Não autenticado')
        }
      } catch (error) {
        FailureNotification({
          message: 'Sessão encerrada',
          description: 'Por favor, faça login novamente.'
        })
        logout()
      }
    }
    checkAuth()
    const user = getUser()
    setNameUser(user.name)
  }, [])

  const handleLogout = async () => {
    Modal.confirm({
      title: 'Confirmar saída da conta',
      icon: <PoweroffOutlined />,
      content:
        'Tem certeza de que deseja sair da sua conta? Ao sair, você será desconectado e precisará fazer login novamente.',
      okText: 'Confirmar',
      cancelText: 'Cancelar',
      onOk: () => onLogout(),
      onCancel: () => Modal.destroyAll()
    })
  }

  const onLogout = () => {
    SuccessNotification({
      message: 'Sessão encerrada',
      description: 'A sua sessão foi encerrada.'
    })
    logout()
    navigate('/')
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleItemClick = item => {
    setSelectedItem(item)
    localStorage.setItem('selectedItem', item)
  }

  return (
    <div className={`app ${menuOpen ? 'menu-open' : ''}`}>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className={`logo-h2 ${menuOpen ? '' : 'hide'}`}>Linguix</h2>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={`menu-toggle-left ${
              menuOpen ? '' : 'menu-toggle-left-hide'
            }`}
            onClick={toggleMenu}
          />
          <FontAwesomeIcon
            icon={faAngleRight}
            className={`menu-toggle-right ${
              menuOpen ? '' : 'menu-toggle-right-hide'
            }`}
            onClick={toggleMenu}
          />
        </div>
        <ul className={!menuOpen ? 'hide-text' : ''}>
          {/* <button onClick={() => handleItemClick('New')} className="btn-menu">
            <span>Administrar</span>
          </button> */}
          <div className="user-info">
            <FontAwesomeIcon icon={faUserCircle} size="2x" className="avatar" />
            <span className={`user-name ${menuOpen ? '' : 'hide'}`}>
              {nameUser}
            </span>
          </div>
          <li onClick={() => handleItemClick('Home')}>
            <FontAwesomeIcon className="icon" icon={faHouse} />
            <span>Home</span>
          </li>
          <li onClick={() => handleItemClick('Quiz')}>
            <FontAwesomeIcon className="icon" icon={faQuestionCircle} />
            <span>Quiz</span>
          </li>
          <li onClick={() => handleItemClick('Ranking')}>
            <FontAwesomeIcon className="icon" icon={faTrophy} />
            <span>Ranking</span>
          </li>
          <li onClick={() => handleItemClick('Profile')}>
            <FontAwesomeIcon className="icon" icon={faUser} />
            <span>Perfil</span>
          </li>
          <FontAwesomeIcon
            className="logout"
            icon={faRightFromBracket}
            onClick={handleLogout}
          />
        </ul>
      </div>
      <div className="content">
        <div className="page-content">
          {selectedItem === 'Home' && <h1>Teste</h1>}
          {selectedItem === 'Quiz' && <h1>Home</h1>}
          {selectedItem === 'Ranking' && <p>Conteúdo da Página About</p>}
          {selectedItem === 'Profile' && <p>Conteúdo da Página Contact</p>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
