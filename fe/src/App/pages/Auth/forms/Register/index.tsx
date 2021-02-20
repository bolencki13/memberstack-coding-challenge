import React from 'react'
import { Row, Form, Col, Alert, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import auth, { RegisterProcess } from '../../../../../redux/auth'

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8)
    .required('Required')
})

const initialValues = {
  fullName: '',
  email: '',
  password: ''
}

type RegisterFormProps = {
  onRequestLogin: () => void
}

export default function RegisterForm (props: RegisterFormProps) {
  const [error, setError] = React.useState('')
  const dispatch: any = useDispatch()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setError('')

          await dispatch(auth.execute(RegisterProcess, values))

          resetForm({})
        } catch (e) {
          setError(e.message)
        }
        setSubmitting(false)
      }}
    >
      {(formProps) => {
        return (
          <Form onSubmit={formProps.handleSubmit}>
            <Row className="p-3">
              <Col xs={12}>
                <h1>Register</h1>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="fullName">
                  <Form.Label>Full name</Form.Label>
                  <Form.Control type="text" placeholder="Enter full name" name="fullName" onChange={formProps.handleChange} value={formProps.values.fullName} />
                  <small className="text-danger">{formProps.errors.fullName}</small>
                  <Form.Text className="text-muted">
                    What do you call yourself?
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" onChange={formProps.handleChange} value={formProps.values.email} />
                  <small className="text-danger">{formProps.errors.email}</small>
                  <Form.Text className="text-muted">
                    This is also your username.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" name="password" onChange={formProps.handleChange} value={formProps.values.password} />
                  <small className="text-danger">{formProps.errors.password}</small>
                  <Form.Text className="text-muted">
                    Must be at least a length of 8.
                  </Form.Text>
                </Form.Group>
              </Col>
              {error && (
                <Col xs={12}>
                  <Alert variant={'danger'}>{error}</Alert>
                </Col>
              )}
              <Col xs={12}>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={formProps.isSubmitting}
                >
                  Sign Up!
                </Button>
                <p className="mt-2">
                  Already have an account?
                  <Button
                    variant="link"
                    className="pr-0 pt-0 pb-0 pl-1 m-0"
                    onClick={() => props.onRequestLogin()}
                  >
                    Login
                  </Button>
                </p>
              </Col>
            </Row>
          </Form>
        )
      }}
    </Formik>
  )
}
