import {
  IChargeProcessor,
  ChargeProcessorResult,
  ChargeProcessorChargeOptions
} from './interfaces'
import { ChargeFacilitator } from '../../../models/Payment'

export type PaypalChargeProcessorOptions = {
  clientCharge: {
    id: string
    createdAt: string
  }
}

export default class PaypalChargeProcessor implements IChargeProcessor {
  constructor(private _options: PaypalChargeProcessorOptions) {}

  async charge(
    options: ChargeProcessorChargeOptions
  ): Promise<ChargeProcessorResult> {
    return {
      id: this._options.clientCharge.id,
      description: options.description,
      amount: options.amount,
      createdAt: new Date(this._options.clientCharge.createdAt),
      facilitator: ChargeFacilitator.PAYPAL
    }
  }
}
