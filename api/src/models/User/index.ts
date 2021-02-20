import { Schema, model } from 'mongoose'
import { MemberStackModel, MemberStackDocument } from '../interfaces'

export enum UserRoles {
  USER = 'user'
}

export interface IUser extends MemberStackDocument {
  fullName: string
  email: string
  hash: string
  role: UserRoles
}

export interface IUserModel extends MemberStackModel<IUser> {}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    role: {
      type: String,
      enum: [Object.values(UserRoles)],
      default: UserRoles.USER
    },
    hash: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const modelName = 'User'
export const UserModel = model<IUser, IUserModel>(modelName, UserSchema)
