import React from 'react'
import { Row, Col } from 'react-bootstrap'
import RegisterForm from './forms/Register'
import LoginForm from './forms/Login'
import { useHistory } from 'react-router-dom'

enum FormType {
  Register,
  Login
}

export default function AuthPage() {
  const [formType, setFormType] = React.useState(FormType.Register)
  const history = useHistory()

  const onSuccess = () => {
    history.push('/dashboard')
  }

  return (
    <Row className="justify-content-center m-3">
      <Col className="bg-light rounded border" xs={12} lg={8} xl={6}>
        {
          formType === FormType.Register
          ? (
            <RegisterForm onSuccess={onSuccess} onRequestLogin={() => setFormType(FormType.Login)} />
          ): (
            <LoginForm onSuccess={onSuccess} onRequestRegister={() => setFormType(FormType.Register)} />
          )
        }
      </Col>
    </Row>
  )
}
