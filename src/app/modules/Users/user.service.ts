import { IUser } from './user.interface'
import { User } from './user.model'

const createStudent = async (userData: IUser): Promise<IUser | null> => {
  const result = await User.create(userData)
  return result
}

export const UserService = {
  createStudent,
}
