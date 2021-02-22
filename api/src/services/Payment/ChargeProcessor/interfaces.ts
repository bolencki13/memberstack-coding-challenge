import { ChargeFacilitator } from '../../../models/Payment'

export type ChargeProcessorResult = {
  id: string
  facilitator: ChargeFacilitator
  description: string
  amount: number
  createdAt: Date
}

export type ChargeProcessorChargeOptions = {
  description: string
  amount: number
}

export interface IChargeProcessor {
  charge(options: ChargeProcessorChargeOptions): Promise<ChargeProcessorResult>
}
