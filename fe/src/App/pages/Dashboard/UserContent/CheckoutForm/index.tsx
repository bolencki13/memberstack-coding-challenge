import React from 'react'
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import { Elements } from '@stripe/react-stripe-js'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { loadStripe } from '@stripe/stripe-js'
import StripeForm from './StripeForm'
import PaypalForm from './PaypalForm'
import { PlanJSON, ChargeFacilitator } from '../../../../../types'

const _stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY
if (!_stripeKey) {
  throw new Error("REACT_APP_STRIPE_PUBLIC_KEY has not been set in env.")
}
const stripeKey = _stripeKey // ts was confusing this as still undefined in the funcitonal component. Re-assigning the variable fixed the ts error

const _paypalKey = process.env.REACT_APP_PAYPAL_PUBLIC_KEY
if (!_paypalKey) {
  throw new Error('REACT_APP_PAYPAL_PUBLIC_KEY has not been set in env.')
}
const paypalKey = _paypalKey // ts was confusing this as still undefined in the funcitonal component. Re-assigning the variable fixed the ts error

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
              case ChargeFacilitator.PAYPAL:
                return (
                  <PayPalScriptProvider
                    options={{
                      "client-id": paypalKey
                    }}
                  >
                    <PaypalForm plan={props.plan} />
                  </PayPalScriptProvider>
                )
            }
          })()
        }
      </Col>
    </Row>
  )
}
