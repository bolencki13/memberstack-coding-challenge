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
