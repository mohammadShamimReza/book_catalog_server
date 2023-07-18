import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { IUser, UserModel } from './user.interface'

export const UserSchema = new Schema<IUser, UserModel>({
  email: { type: String, required: true, unique: true },
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

UserSchema.statics.isUserExist = async function (phone: string) {
  return await User.findOne({ phone }, { _id: 1, password: 1 })
}
UserSchema.statics.isPasswordValid = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

UserSchema.pre('save', async function (next) {
  //hasing user password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds),
  )
  next()
})

export const User = model<IUser, UserModel>('User', UserSchema)
