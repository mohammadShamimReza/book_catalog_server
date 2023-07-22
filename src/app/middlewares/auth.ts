import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import { jwtHelpers } from '../../helper/jwtHelpers'

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization
    const { refreshToken } = req.cookies
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
    }
    const varifyAcctessToken = jwtHelpers.varifyToken(
      token,
      config.jwt.secret as Secret,
    )
    const accessId = varifyAcctessToken._id

    if (!refreshToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
    }
    const varifyRefreshToken = jwtHelpers.varifyToken(
      token,
      config.jwt.secret as Secret,
    )
    const refreshId = varifyRefreshToken._id

    if (accessId === refreshId) {
      next()
    } else {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'your information is not authorized',
      )
    }
  } catch (error) {
    next(error)
  }
}

export default auth
