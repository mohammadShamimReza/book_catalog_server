import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

export const UserSchema = new Schema<IUser, UserModel>({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },

  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export const User = model<IUser, UserModel>('User', UserSchema)
