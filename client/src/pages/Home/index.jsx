import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faMedal,
  faLevelUpAlt,
  faCalendarDay,
  faTrophy
} from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header'
import HeroSection from '../../components/Banner'
import Carousel from '../../components/Carousel'
import Footer from '../../components/Footer'
import Animated from '../../components/Animation/animatedElement'
import PriceSection from '../../components/Price'
import Statistcs from '../../components/Statistcs'
import './style.css'
import '../../App.css'

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <section className="about">
          <Animated>
            <p>
              O <strong>Linguix</strong> é uma plataforma educacional inovadora
              que utiliza elementos de gamificação para tornar o aprendizado de
              idiomas mais envolvente e eficaz. Nossa missão é transformar a
              forma como você aprende novos idiomas, incorporando mecânicas de
              jogos como pontos, medalhas, níveis e desafios para motivá-lo a
              progredir em seus estudos de maneira divertida e interativa.
            </p>
          </Animated>
        </section>
        <section className="features">
          <Animated>
            <p>
              Descubra as funcionalidades que fazem do <strong>Linguix</strong>{' '}
              a melhor escolha para seu aprendizado de idiomas.
            </p>
            <div className="list">
              <ul>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                  <strong>Sistema de Pontos: </strong> Ganhe pontos ao completar
                  quizzes e tarefas interativas.
                </li>
                <li>
                  <FontAwesomeIcon icon={faMedal} />
                  <strong>Medalhas e Conquistas: </strong> Receba medalhas por
                  alcançar marcos importantes e completar desafios.
                </li>
                <li>
                  <FontAwesomeIcon icon={faLevelUpAlt} />
                  <strong>Níveis e Progressão: </strong> Suba de nível à medida
                  que acumula pontos e desbloqueie novos conteúdos.
                </li>
                <li>
                  <FontAwesomeIcon icon={faCalendarDay} />
                  <strong>Desafios Diários: </strong> Participe de desafios
                  diários para testar e reforçar seu conhecimento.
                </li>
                <li>
                  <FontAwesomeIcon icon={faTrophy} />
                  <strong>Ranking Público: </strong> Compare seu desempenho com
                  outros usuários e veja quem está no topo do ranking.
                </li>
              </ul>
            </div>
          </Animated>
        </section>
        <section className="price">
          <PriceSection />
        </section>
        <section className="feedback">
          <Animated>
            <Carousel />
          </Animated>
        </section>
        <section className="action">
          <Animated>
            <div className="text">
              <h2>Pronto para Dominar um Novo Idioma?</h2>
              <p>
                Junte-se ao <strong>Linguix</strong> hoje e comece a aprender
                idiomas de forma divertida e interativa. Não perca tempo, a
                jornada para o conhecimento começa agora!
              </p>
              <div className="button">
                <a href="/sign-up">
                  <button>Comece Agora</button>
                </a>
                <button>Entre em Contato</button>
              </div>
            </div>
          </Animated>
        </section>
      </main>
      <Statistcs />
      <Footer />
    </>
  )
}

export default Home
