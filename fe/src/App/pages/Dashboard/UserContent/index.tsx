import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { UserJSON } from '../../../../types'
import { useDispatch } from 'react-redux'
import auth, { LogoutProcess } from '../../../../redux/auth'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

type UserContent = {
  user: UserJSON
}

export default function UserContent (props: UserContent) {
  const dispatch: any = useDispatch()
  const history = useHistory()

  return (
    <Row className="p-3">
      <Col xs={12}>
        <Row>
          <Col>
            <h1>Welcome</h1>
          </Col>
          <Col className="text-right">
            <Button variant="outline-danger" size="sm" onClick={async () => {
              try {
                await dispatch(auth.execute(LogoutProcess))
              } catch (e) {
                console.log(e)
              } finally {
                history.push('/')
              }
            }}>Logout</Button>
          </Col>
        </Row>
      </Col>
      <Col xs={12}>
        <p className="mb-0"><span className="font-weight-bold">Full Name:</span> {props.user.fullName}</p>
        <p className="mb-0"><span className="font-weight-bold">Email:</span> {props.user.email}</p>
        <p className="mb-0"><span className="font-weight-bold">Joined:</span> {moment(props.user.createdAt).format('LLLL')}</p>
      </Col>
    </Row>
  )
}
