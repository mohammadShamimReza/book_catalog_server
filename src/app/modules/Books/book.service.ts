import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../Users/user.model'
import { IBook } from './book.interface'
import { Book } from './book.model'

const createBook = async (bookData: IBook): Promise<IBook | null> => {
  const ifExists = await User.findById(bookData.ownerUser)
  if (!ifExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  const result = Book.create(bookData)
  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getBooks = async (searchBookData: string) => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFilterBooks = async (filterBookData: any) => {
  console.log(filterBookData)
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

export const bookService = {
  createBook,
  getBooks,
  getFilterBooks,
  updateBook,
  deleteBook,
}
