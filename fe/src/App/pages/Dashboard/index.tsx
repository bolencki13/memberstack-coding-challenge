import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default function DashboardPage() {
  return (
    <Row className="justify-content-center m-3">
      <Col className="bg-light rounded border" xs={12} lg={8} xl={6}>
        <p>Hello world</p>
      </Col>
    </Row>
  )
}
