import React from 'react'
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import StripeForm from './StripeForm'
import { PlanJSON, ChargeFacilitator } from '../../../../../types'

const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY
if (!stripeKey) {
  throw new Error("REACT_APP_STRIPE_PUBLIC_KEY has not been set in env.")
}

const stripePromise = loadStripe(stripeKey)

type CheckoutFormProps = {
  plan: PlanJSON
}

export default function CheckoutForm (props: CheckoutFormProps) {
  const [targetFacilitator, setTargetFacilitator] = React.useState(ChargeFacilitator.STRIPE)
  return (
    <Row>
      <Col xs={12}>
        <h3>{props.plan.name}</h3>
        <p className="text-muted">{props.plan.description} - <span className="font-weight-bold">${props.plan.paymentOptions[0].amount}</span></p>
      </Col>
      <Col xs={12}>
        <ButtonGroup aria-label="payment-facilitator-picker" className="w-100">
          {
            Object.values(ChargeFacilitator).map((facilitator) => {
              return (
                <Button key={facilitator} variant={facilitator === targetFacilitator ? 'secondary' : 'outline-secondary'} onClick={() => setTargetFacilitator(facilitator)}>{facilitator}</Button>
              )
            })
          }
        </ButtonGroup>
      </Col>
      <Col xs={12}>
        {
          (() => {
            switch (targetFacilitator) {
              case ChargeFacilitator.STRIPE:
                return (
                  <Elements stripe={stripePromise}>
                    <StripeForm/>
                  </Elements>
                )
            }
          })()
        }
      </Col>
    </Row>
  )
}
