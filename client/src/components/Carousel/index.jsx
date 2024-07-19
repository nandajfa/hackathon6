import React from 'react'
import Slider from 'react-slick'
import './style.css'

const feedbacks = [
  {
    quote:
      'O Linguix tornou o aprendizado de idiomas muito mais divertido e motivador! Adoro ganhar medalhas e competir no ranking.',
    author: 'Maria Silva'
  },
  {
    quote:
      'A gamificação realmente me ajudou a manter o foco e a progredir rapidamente no meu novo idioma. Recomendo a todos!',
    author: 'João Pereira'
  },
  {
    quote:
      'Excelente plataforma! A abordagem gamificada fez com que eu realmente me envolvesse no processo de aprendizado.',
    author: 'Ana Costa'
  },
  {
    quote:
      'Muito satisfeito com a experiência. A interação e os desafios são ótimos para manter o aprendizado interessante.',
    author: 'Pedro Almeida'
  }
]

const FeedbackCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  }

  return (
    <section className="feedback">
      <h2>Depoimentos</h2>
      <p>
        Veja como o <strong>Linguix</strong> está transformando a experiência de
        aprendizado de idiomas de nossos usuários.
      </p>
      <Slider {...settings}>
        {feedbacks.map((feedback, index) => (
          <div key={index} className="feedback-item">
            <blockquote>
              <p>"{feedback.quote}"</p>
              <footer>— {feedback.author}</footer>
            </blockquote>
          </div>
        ))}
      </Slider>
    </section>
  )
}

export default FeedbackCarousel
