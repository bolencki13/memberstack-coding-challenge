import React from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'

export default function LoadingView () {
  return (
    <Row className="justify-content-center align-items-center">
      <Col>
        <Spinner animation="border" />
      </Col>
    </Row>
  )
}
