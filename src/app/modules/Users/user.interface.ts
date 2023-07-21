import { Model } from 'mongoose'

export type IUser = {
  name: string
  email: string
  phone: string
  address: string
  password: string
}
export type UserModel = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isUserExist(emali: string): any
  isPasswordValid(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
} & Model<IUser>
