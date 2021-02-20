import React from 'react'
import { Row, Col } from 'react-bootstrap'
import RegisterForm from './forms/Register'

enum FormType {
  Register,
  Login
}

export default function AuthPage() {
  const [formType, setFormType] = React.useState(FormType.Register)

  return (
    <Row className="justify-content-center m-3">
      <Col className="bg-light rounded border" xs={12} lg={8} xl={6}>
        {
          formType === FormType.Register
          ? (
            <RegisterForm onRequestLogin={() => setFormType(FormType.Login)} />
          ): (
            <p>Login</p>
          )
        }
      </Col>
    </Row>
  )
}
