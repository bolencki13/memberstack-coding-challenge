import { ContainerInterface } from '@halliganjs/service-container'
import Stripe from 'stripe'
import Payment from '../services/Payment'

export default function (container: ContainerInterface) {
  container.singleton(Stripe, function () {
    let stripeSecret = process.env.STRIPE_SECRET
    if (!stripeSecret) {
      throw new Error('STRIPE_SECRET has not been set in the env')
    }

    return new Stripe(stripeSecret, {
      apiVersion: '2020-08-27'
    })
  })

  container.singleton(Payment, function () {
    return new Payment()
  })
}
