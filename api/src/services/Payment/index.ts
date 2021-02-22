import {
  IChargeProcessor,
  ChargeProcessorChargeOptions
} from './ChargeProcessor/interfaces'
import { IUser } from '../../models/User'
import { IPaymentModel } from '../../models/Payment'
import container from '../../container'

export type PaymentCreactOptions = {
  user: IUser
  charge: ChargeProcessorChargeOptions
}

export default class Payment {
  async create(options: PaymentCreactOptions, processor: IChargeProcessor) {
    const result = await processor.charge(options.charge)

    const Payment = container.make('models').Payment as IPaymentModel
    const payment = await Payment.create({
      facilitator: result.facilitator,
      description: options.charge.description,
      amount: options.charge.amount,
      chargedAt: result.createdAt,
      facilitatorId: result.id,
      user: options.user
    })

    return payment
  }
}
