import React, { useRef, useState, useEffect } from 'react'
import CountUp from 'react-countup'
import './style.css'

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const sectionElement = sectionRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(sectionElement)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionElement) {
      observer.observe(sectionElement)
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement)
      }
    }
  }, [])

  return (
    <section className="statistics" ref={sectionRef}>
      <div className="statistics-container">
        <div className="stat">
          <h3>{isVisible && <CountUp end={500} duration={2} />}</h3>
          <p>Usuários Ativos</p>
        </div>
        <div className="stat">
          <h3>{isVisible && <CountUp end={200} duration={2} />}+</h3>
          <p>Horas de Conteúdo</p>
        </div>
        <div className="stat">
          <h3>{isVisible && <CountUp end={8000} duration={2} />}</h3>
          <p>Quizzes Realizados</p>
        </div>
        <div className="stat">
          <h3>{isVisible && <CountUp end={12} duration={2} />}+</h3>
          <p>Idiomas Oferecidos</p>
        </div>
        <div className="stat">
          <h3>{isVisible && <CountUp end={800} duration={2} />}+</h3>
          <p>Clientes Satisfeitos</p>
        </div>
      </div>
    </section>
  )
}

export default Statistics
