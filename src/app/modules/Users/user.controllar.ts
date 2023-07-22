import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './user.interface'
import { UserService } from './user.service'

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body
    const result = await UserService.createStudent(userData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  },
)
export const UserController = {
  createUser,
}
