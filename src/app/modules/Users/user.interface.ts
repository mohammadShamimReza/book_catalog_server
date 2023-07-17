import { Model } from 'mongoose'

export type IUser = {
  name: {
    firstName: string
    lastName: string
  }
  email: string
  phone: string
  address: string
  password: string
}

export type UserModel = Model<IUser, Record<string, unknown>>