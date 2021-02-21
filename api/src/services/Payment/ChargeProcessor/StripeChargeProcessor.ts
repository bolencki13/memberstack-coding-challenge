import {
  IChargeProcessor,
  ChargeProcessorResult,
  ChargeProcessorChargeOptions,
  ChargeProcessorFacilitator
} from './interfaces'
import container from '../../../container'
import Stripe from 'stripe'

export type StripeChargeProcessorOptions = {
  source: string // card token
}

export default class StripeChargeProcessor implements IChargeProcessor {
  private _stripe: Stripe = container.make(Stripe)

  constructor(private _options: StripeChargeProcessorOptions) {}

  async charge(
    options: ChargeProcessorChargeOptions
  ): Promise<ChargeProcessorResult> {
    const charge = await this._stripe.charges.create({
      amount: options.amount * 100,
      currency: 'usd',
      source: this._options.source,
      description: options.description
    })

    return {
      id: charge.id,
      description: charge.description || options.description,
      amount: charge.amount / 100,
      createdAt: new Date(charge.created),
      facilitator: ChargeProcessorFacilitator.STRIPE
    }
  }
}
