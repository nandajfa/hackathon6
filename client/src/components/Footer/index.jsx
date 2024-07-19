// src/components/Footer.jsx
import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faXTwitter,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h4>Sobre o PollySpeak</h4>
          <p>
            O PollySpeak é uma plataforma gamificada para o aprendizado de
            idiomas. Nossa missão é tornar o aprendizado divertido e eficaz.
          </p>
        </div>
        <div className="footer-links">
          <h4>Links Úteis</h4>
          <ul>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#questions">Perguntas frequentes</a>
            </li>
            <li>
              <a href="#privacy">Privacidade</a>
            </li>
            <li>
              <a href="#support">Suporte</a>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contato</h4>
          <p>Email: contato@pollyspeak.com</p>
          <p>Telefone: (11) 1234-5678</p>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://x.com/"
              aria-label="X"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a
              href="https://www.linkedin.com/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 PollySpeak. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
