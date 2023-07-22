import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helper/jwtHelpers'
import { User } from '../Users/user.model'
import { IBook } from './book.interface'
import { Book } from './book.model'

const createBook = async (
  bookData: IBook,
  token: string | undefined,
): Promise<IBook | null> => {
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
  }
  const varifyAcctessToken = jwtHelpers.varifyToken(
    token,
    config.jwt.secret as Secret,
  )

  const _id = varifyAcctessToken._id

  const ifExists = await User.findById(_id)
  if (!ifExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  bookData.ownerUser = _id
  const result = Book.create(bookData)
  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSearchBooks = async (searchBookData: string) => {
  if (!searchBookData || searchBookData === 'undefined') {
    const result = Book.find({})
    return result
  } else {
    const result = Book.find({
      $or: [
        { title: { $regex: searchBookData, $options: 'i' } },
        { author: { $regex: searchBookData, $options: 'i' } },
        { genre: { $regex: searchBookData, $options: 'i' } },
        { publication_date: { $regex: searchBookData, $options: 'i' } },
      ],
    })
    return result
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFilterBooks = async (filterBookData: any) => {
  const result = Book.find({
    $and: Object.entries(filterBookData).map(([field, value]) => ({
      [field]: value,
    })),
  })
  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateBook = async (id: string, updateBook: any) => {
  const ifExist = await Book.findById(id)

  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'book not found')
  }
  const result = Book.findOneAndUpdate({ _id: id }, updateBook, {
    new: true,
  })
  return result
}

const deleteBook = async (id: string) => {
  const ifExist = await Book.findById(id)

  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'book not found')
  }
  const result = Book.findOneAndDelete({ _id: id })
  return result
}

const getAllBooks = async () => {
  const result = Book.find({})
  return result
}

const getTenBooks = async () => {
  const result = Book.find().sort({ createdAt: -1 }).limit(10)
  return result
}

const getSingleBook = async (id: string) => {
  const result = Book.findById(id)
  return result
}

const postBookReview = async (id: string, review: string) => {
  const result = Book.findByIdAndUpdate(
    { _id: id },
    { $push: { reviews: review } },
    { upsert: true, new: true },
  )
  return result
}

const getBookReview = async (id: string) => {
  const result = Book.findById({ _id: id })
  return result
}

export const bookService = {
  createBook,
  getSearchBooks,
  getFilterBooks,
  updateBook,
  deleteBook,
  getAllBooks,
  getTenBooks,
  getSingleBook,
  postBookReview,
  getBookReview,
}
