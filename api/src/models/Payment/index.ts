import { Schema, model, Types } from 'mongoose'
import { MemberStackModel, MemberStackDocument } from '../interfaces'
import { IUser, modelName as userModelName } from '../User'

export enum ChargeFacilitator {
  STRIPE = 'stripe'
}

export interface IPayment extends MemberStackDocument {
  facilitator: ChargeFacilitator
  description: string
  amount: number
  chargedAt: Date
  facilitatorId: string
  user: string | IUser
}

export interface IPaymentModel extends MemberStackModel<IPayment> {}

const PaymentSchema = new Schema<IPayment>(
  {
    facilitator: {
      type: String,
      enum: Object.values(ChargeFacilitator),
      required: true
    },
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    chargedAt: {
      type: Date,
      required: true
    },
    facilitatorId: {
      type: String,
      required: true
    },
    user: {
      type: Types.ObjectId,
      ref: userModelName,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.facilitatorId
      }
    }
  }
)

export const modelName = 'Payment'
export const PaymentModel = model<IPayment, IPaymentModel>(
  modelName,
  PaymentSchema
)
