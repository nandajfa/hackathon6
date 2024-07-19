import React from 'react'
import './style.css'

const Banner = () => {
  return (
    <>
      <section className="hero-section">
        <div className="background-image">
          <div className="text">
            <h1>Domine Novos Idiomas com Linguix</h1>
            <p>
              Aprenda idiomas de forma interativa com nossa plataforma
              gamificada.
            </p>
            <a href="/sign-up">
              <button>Comece Agora</button>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Banner
