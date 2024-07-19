import React from 'react'
import { useInView } from 'react-intersection-observer'
import './animatedElement.css'

const AnimatedElement = ({ children }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`animated-element ${inView ? 'animate visible' : 'animate'}`}
    >
      {children}
    </div>
  )
}

export default AnimatedElement
