import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helper/jwtHelpers'
import { User } from '../Users/user.model'
import { IUserLogin } from './auth.interface'

const loginUser = async (LoginData: IUserLogin) => {
  const { email, password } = LoginData

  const isUserExist = await User.isUserExist(email)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordValid(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password not valid')
  }

  console.log(isUserExist)

  const { _id } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { _id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )
  const refreshToken = jwtHelpers.createToken(
    { _id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string) => {
  let varifiedToken = null
  varifiedToken = jwtHelpers.varifyToken(
    token,
    config.jwt.refresh_secret as Secret,
  )

  const { _id } = varifiedToken
  const isUserExist = await User.findOne({ _id: _id })
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // generate new refresh token

  const newAccessToken = jwtHelpers.createToken(
    { _id: _id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  return {
    accessToken: newAccessToken,
  }
}

export const authService = { loginUser, refreshToken }
