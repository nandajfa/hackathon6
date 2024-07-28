import React, { useState } from 'react'
import { getUser } from '../../services/auth'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './style.css'

const Profile = () => {
  const user = getUser()
  const [successMessage, setSuccessMessage] = useState('')

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

  const handleUpdateProfile = async (values, { setSubmitting }) => {
    const { name, email, password } = values
    const user_id = user.id
    try {
      const response = await axios.put(
        `http://localhost:3003/api/users/${user_id}`,
        { name, email, password },
        { withCredentials: true }
      )
      if (response.status === 200) {
        setSuccessMessage('Perfil atualizado com sucesso!')
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
    }
    setSubmitting(false)
  }

  return (
    <div className="profile-container">
      <div className="user-info">
        <FontAwesomeIcon icon={faUserCircle} size="3x" className="avatar" />
        <div className="user-details">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      <hr className="divider" />
      {successMessage && <p className="success-message">{successMessage}</p>}
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleUpdateProfile}
      >
        {({ isSubmitting }) => (
          <Form className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <button
              type="submit"
              className="update-button"
              disabled={isSubmitting}
            >
              Atualizar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Profile
