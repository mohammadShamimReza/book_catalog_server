import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { bookService } from './book.service'

const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body
  const result = await bookService.createBook(bookData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'book created successfully',
    data: result,
  })
})

const getBooks = catchAsync(async (req: Request, res: Response) => {
  const searchBookData = req.query
  const result = await bookService.getBooks(searchBookData.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'book get successfully',
    data: result,
  })
})

export const bookControllar = {
  createBook,
  getBooks,
}
