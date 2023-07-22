import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { bookService } from './book.service'

const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body
  const token = req.headers.authorization
  const result = await bookService.createBook(bookData, token)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'book created successfully',
    data: result,
  })
})

const getSearchBooks = catchAsync(async (req: Request, res: Response) => {
  const searchBookData = req.query
  const result = await bookService.getSearchBooks(
    searchBookData.query as string,
  )

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
  console.log(result, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'book deleted successfully',
    data: result,
  })
})

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.getAllBooks()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'books get successfully',
    data: result,
  })
})

const getTenBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.getTenBooks()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'book get successfully',
    data: result,
  })
})
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await bookService.getSingleBook(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single book get successfully',
    data: result,
  })
})

const postBookReview = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id
  const review = req.body.review
  const result = await bookService.postBookReview(bookId, review)
  console.log(result, 'this is post')
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'book review successfully',
    data: result,
  })
})

const getBookReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await bookService.getBookReview(id)
  // console.log(result, 'result')
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get book review successfully',
    data: result,
  })
})

export const bookControllar = {
  createBook,
  getSearchBooks,
  getFilterBooks,
  updateBook,
  DeleteBook,
  getAllBooks,
  getTenBooks,
  getSingleBook,
  postBookReview,
  getBookReview,
}
