import React from 'react'
import './style.css'

const Header = () => {
  return (
    <header className="main-header">
      <nav>
        <h1>Linguix</h1>
        <a href="/login">
          <button>Login</button>
        </a>
      </nav>
    </header>
  )
}

export default Header
