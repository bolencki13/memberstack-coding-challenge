import React from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { PlanJSON } from '../../../../../../types'
import payment, { PaypalPaymentCreateProcess } from '../../../../../../redux/payment'
import { useDispatch } from 'react-redux'

type PaypalFormProps = {
  plan: PlanJSON
}

export default function PaypalForm (props: PaypalFormProps) {
  const dispatch: any = useDispatch()
  const [error, setError] = React.useState('')

  return (
    <Row className="mt-3">
      <Col xs={12}>
        <PayPalButtons
          createOrder={async (_, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: props.plan.paymentOptions[0].amount.toString(),
                },
                description: props.plan.description
              }]
            })
          }}
          onApprove={async (_, actions) => {
            try {
              const details = await actions.order.capture()
              await dispatch(payment.execute(PaypalPaymentCreateProcess, {
                id: details.id,
                createdAt: details.create_time
              }))
            } catch (e) {
              setError(e.message)
            }
          }}
          onError={(e) => {
            console.error(e)
            setError('An error occured with PayPal.')
          }}
        />
      </Col>
      {error && (
        <Col xs={12}>
          <Alert variant={'danger'}>{error}</Alert>
        </Col>
      )}
    </Row>
  )
}
