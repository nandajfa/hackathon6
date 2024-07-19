import React from 'react'
import * as Yup from 'yup'
import './style.css'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório')
  })

  return (
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
              // onSubmit={handleSubmit}
            >
              {/* {({ isSubmitting }) => ( */}
              <Form>
                <div className="user-box">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    aria-describedby="email-error"
                    // aria-invalid={isSubmitting}
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
                    // aria-invalid={isSubmitting}
                    aria-required="true"
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="error"
                    id="password-error"
                  />
                </div>
                <button

                // type="submit"
                // disabled={isSubmitting}
                // aria-busy={isSubmitting}
                // aria-label={isSubmitting ? 'Logging In...' : 'Login'}
                >
                  Entrar
                  {/* {isSubmitting ? 'Logging In...' : 'Login'} */}
                </button>
              </Form>
              {/* )} */}
            </Formik>
            <p className="p-login">
              Não possui conta?{' '}
              <a className="link-signup" href="/sign-up">
                Criar conta
              </a>
              <div className="forgot-pass">
                <a href="#ola">Esqueci a senha</a>
              </div>
            </p>
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
