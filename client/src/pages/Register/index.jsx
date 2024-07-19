import React from 'react'
// import FailureNotification from '../../components/Notification/FailureNotification'
// import SuccessNotification from '../../components/Notification/FailureNotification'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
// import axios from 'axios'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('O nome é obrigatório.')
      .min(3, 'O nome deve ter no mínimo 3 caracteres.'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('O e-mail é obrigatório.'),
    password: Yup.string()
      .required('A senha é obrigatória.')
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        '6 caracteres: 1 maiúsculo, 1 número e 1 especial.'
      )
  })

  //   const handleSubmit = async (values, { setSubmitting }) => {
  //     try {
  //       const response = await axios.post(
  //         'http://localhost:3003/auth/register',
  //         values
  //       )

  //       if (response.data.message === 'success') {
  //         SuccessNotification({
  //           message: 'Registrado com sucesso',
  //           description: 'Você será redirecionado para a página de login.'
  //         })
  //         setTimeout(() => {
  //           if (response.status === 201) {
  //             window.location.href = '/login'
  //           }
  //         }, 3000)
  //       } else {
  //         FailureNotification({
  //           message: 'Erro ao registrar',
  //           description: 'Email já está em uso'
  //         })
  //       }
  //       setSubmitting(false)
  //     } catch (error) {
  //       FailureNotification({
  //         message: 'Erro ao registrar',
  //         description: 'Erro interno do servidor'
  //       })
  //       setSubmitting(false)
  //     }
  //   }

  return (
    <>
      <div className="container">
        <div className="text-container">
          <h1 className="text-login">
            Crie sua conta <br />{' '}
            <strong className="text-animation">grátis</strong>{' '}
          </h1>
          <a href="/" className="icon-container">
            <FontAwesomeIcon icon={faHouse} className="social-icon" />
          </a>
        </div>
        <div className="login-box">
          <div className="form">
            <h2 className="login-title">Vamos começar</h2>
            <Formik
              initialValues={{ name: '', email: '', password: '' }}
              validationSchema={validationSchema}
              //   onSubmit={handleSubmit}
            >
              {/* {({ isSubmitting }) => ( */}
              <Form>
                <div className="user-box">
                  <label htmlFor="name">Nome</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="description"
                    aria-describedby="name-error"
                    // aria-invalid={isSubmitting}
                    aria-required="true"
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="error"
                    id="name-error"
                  />
                </div>
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

                //   type="submit"
                // disabled={isSubmitting}
                // aria-busy={isSubmitting}
                // aria-label={isSubmitting ? 'Register...' : 'Sign up'}
                >
                  {/* {isSubmitting ? 'Register...' : 'Sign up'} */}
                  Registrar
                </button>
              </Form>
              {/* )} */}
            </Formik>
            <p className="p-login">
              Já tem conta?{' '}
              <a className="link-signin" href="/login">
                Faça login
              </a>
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

export default Register
