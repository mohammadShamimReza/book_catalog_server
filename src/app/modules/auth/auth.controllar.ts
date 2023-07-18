import { Request, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../../config'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IRefreshTokenResponse } from './auth.interface'
import { authService } from './auth.service'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const LoginData = req.body
  const result = await authService.loginUser(LoginData)
  const { accessToken, refreshToken } = result
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOption)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    data: {
      accessToken: accessToken,
    },
  })
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const result = await authService.refreshToken(refreshToken)
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOption)

  sendResponse<IRefreshTokenResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: result,
  })
})

const logOut = catchAsync(async (req: Request, res: Response) => {
  res.cookie('refreshToken', '', { expires: new Date(0) })

  sendResponse<IRefreshTokenResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged out successfully',
    data: null,
  })
})

export const AuthController = { loginUser, refreshToken, logOut }
