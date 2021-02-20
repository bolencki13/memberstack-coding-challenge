import { Document, Model } from 'mongoose'

export interface MemberStackDocument extends Document {
  createdAt: Date
  updatedAt: Date
}

export interface MemberStackModel<T extends MemberStackDocument>
  extends Model<T> {}
