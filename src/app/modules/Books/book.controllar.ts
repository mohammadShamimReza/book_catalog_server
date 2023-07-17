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
  const result = await bookService.getBooks(searchBookData.query as string)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'book get successfully',
    data: result,
  })
})

const getFilterBooks = catchAsync(async (req: Request, res: Response) => {
  const searchBookData = req.query
  const result = await bookService.getFilterBooks(searchBookData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'book get successfully',
    data: result,
  })
})

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updateBookData = req.body
  const result = await bookService.updateBook(id, updateBookData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'book update successfully',
    data: result,
  })
})

const DeleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await bookService.deleteBook(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'book deleted successfully',
    data: result,
  })
})

export const bookControllar = {
  createBook,
  getBooks,
  getFilterBooks,
  updateBook,
  DeleteBook,
}
