export enum ChargeFacilitator {
  STRIPE = 'stripe',
  PAYPAL = 'paypal'
}

export type UserJSON = {
  _id: string
  fullName: string
  email: string
  createdAt: string
  updatedAt: string
}

export type PlanJSON = {
  id: string
  name: string
  description: string
  paymentOptions:{
    type: string,
    amount: number,
    currency: string
  }[]
}

export type PaymentJSON = {
  _id: string
  facilitator: ChargeFacilitator
  description: string
  amount: number
  chargedAt: Date
  user: string
  createdAt: string
  updatedAt: string
}
