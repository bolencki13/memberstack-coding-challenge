import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { PaymentJSON } from '../../../../../types'

type PaymentHistoryProps = {
  payment: PaymentJSON
}

export default function PaymentHistory (props: PaymentHistoryProps) {
  return (
    <Row>
      <Col xs={12}>
        <h3>Payment History</h3>
        <p className="text-muted"><span className="font-weight-bold">{props.payment.facilitator}</span> - {props.payment.description} - ${props.payment.amount}</p>
      </Col>
    </Row>
  )
}
