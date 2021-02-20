import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { UserJSON } from '../../../../types'

type UserContent = {
  user: UserJSON
}

export default function UserContent (props: UserContent) {
  return (
    <Row>
      <Col xs={12}>
        <p>{props.user.fullName}</p>
      </Col>
    </Row>
  )
}
