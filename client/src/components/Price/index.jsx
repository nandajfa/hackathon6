import React from 'react'
import Animated from '../../components/Animation/animatedElement'
import './style.css'

const PriceSection = () => {
  return (
    <section className="pricing">
      <Animated>
        <h2>Escolha o Plano Ideal para Você</h2>
        <div className="pricing-cards">
          <div className="pricing-card free">
            <h3>Plano Básico</h3>
            <p className="price">Grátis</p>
            <ul>
              <li>Quizzes Básicos</li>
              <li>Desafios Diários</li>
              <li>Ranking Público</li>
              <li>Suporte Limitado</li>
            </ul>
            <button className="btn">Comece Agora</button>
          </div>
          <div className="pricing-card pro">
            <h3>Plano Pro</h3>
            <p className="price">R$19.99/mês</p>
            <ul>
              <li>Todos os Quizzes</li>
              <li>Desafios Avançados</li>
              <li>Medalhas e Conquistas</li>
              <li>Suporte Prioritário</li>
              <li>Acesso a Novos Idiomas</li>
            </ul>
            <button className="btn">Assine Agora</button>
          </div>
        </div>
      </Animated>
    </section>
  )
}

export default PriceSection
