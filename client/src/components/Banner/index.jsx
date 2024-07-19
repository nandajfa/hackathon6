import React from 'react'
import img from '../../assets/languages.jpg'
import './style.css'

const Banner = () => {
  return (
    <>
      <section className="hero-section">
        <div className="text">
          <h1>Domine Novos Idiomas com PollySpeak</h1>
          <p>
            Aprenda idiomas de forma divertida e interativa com nossa plataforma
            gamificada.
          </p>
          <button>Comece Agora</button>
        </div>
        <div className="container-image">
          <img src={img} alt="Imagens de varias bandeiras" />
        </div>
      </section>
    </>
  )
}

export default Banner
