import { Schema, model } from 'mongoose'
import { IUserLogin } from './auth.interface'

const authSchema = new Schema<IUserLogin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export const Auth = model<IUserLogin>('Auth', authSchema)
