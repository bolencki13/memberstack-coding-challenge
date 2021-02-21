export enum ChargeProcessorFacilitator {
  STRIPE = 'stripe'
}

export type ChargeProcessorResult = {
  id: string
  facilitator: ChargeProcessorFacilitator
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
