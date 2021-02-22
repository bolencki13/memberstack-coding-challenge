import React from 'react'
import { Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import payment, { StripePaymentCreateProcess } from '../../../../../../redux/payment'
import { useDispatch } from 'react-redux'

export default function StripeForm () {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch: any = useDispatch()
  const [error, setError] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  return (
    <Form onSubmit={async (e) => {
      try {
        setIsSubmitting(true)
        e.preventDefault()

        if (!stripe || !elements) {
          throw new Error('Stripe has not loaded yet.')
        }

        const cardElement = elements.getElement(CardElement)
        if (!cardElement) {
          throw new Error('Stripe did not return a card element.')
        }

        const {error, token} = await stripe.createToken(cardElement)
        if (error) {
          throw error
        }
        if (!token) {
          throw new Error('Stripe failed to return an error or a payment method.')
        }

        await dispatch(payment.execute(StripePaymentCreateProcess, {
          token: token.id
        }))
      } catch (e) {
        setError(e.message)
        setIsSubmitting(false)
      }
    }}>
      <Row noGutters className="mt-3 mb-3">
        <Col className="border rounded pl-3 pr-3 pt-2 pb-2 mb-3">
          <CardElement />
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
            disabled={isSubmitting || !stripe}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
