import React, { useState } from 'react'
import * as Yup from 'yup'
import './style.css'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FailureNotification from '../../components/Notification/FailureNotification'
import SuccessNotification from '../../components/Notification/SuccessNotification'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { setUser } from '../../services/auth'

const Login = () => {
  const [redirectHome, setRedirectHome] = useState(false)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório')
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        'http://localhost:3003/api/login',
        values,
        { withCredentials: true }
      )

      if (response.data.message === 'Fail') {
        FailureNotification({
          message: 'Falha ao fazer login',
          description: 'Usuário não autenticado.'
        })
      } else if (response.data.message === 'Success') {
        SuccessNotification({
          message: 'Logado com sucesso',
          description: ''
        })
        setUser(response.data.user)
        setRedirectHome(true)
      }

      setSubmitting(false)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        FailureNotification({
          message: 'Erro ao fazer login',
          description: 'Credenciais inválidas.'
        })
      } else {
        FailureNotification({
          message: 'Erro ao fazer login',
          description: 'Usuário não encontrado.'
        })
      }
    }
  }

  return redirectHome ? (
    <Navigate to="/menu" replace />
  ) : (
    <>
      <div className="container">
        <div className="text-container">
          <h1 className="text-login">
            Bem vindo de volta <br /> ao{' '}
            <strong className="text-animation">Linguix</strong>
          </h1>
          <a href="/" className="icon-container">
            <FontAwesomeIcon icon={faHouse} className="social-icon" />
          </a>
        </div>
        <div className="login-box">
          <div className="form">
            <h2 className="login-title">Login</h2>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="user-box">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    aria-describedby="email-error"
                    aria-required="true"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="error"
                    id="email-error"
                  />
                </div>
                <div className="user-box">
                  <label htmlFor="password">Senha</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    aria-describedby="password-error"
                    aria-required="true"
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="error"
                    id="password-error"
                  />
                </div>
                <button type="submit">Entrar</button>
              </Form>
            </Formik>
            <div className="p-login">
              Não possui conta?{' '}
              <a className="link-signup" href="/sign-up">
                Criar conta
              </a>
              <div className="forgot-pass">
                <a href="#ola">Esqueci a senha</a>
              </div>
            </div>
            <a href="/" className="icon-container">
              <FontAwesomeIcon icon={faHouse} className="social-icon-form" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
