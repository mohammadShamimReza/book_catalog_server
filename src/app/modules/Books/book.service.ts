import { IBook } from './book.interface'
import { Book } from './book.model'

const createBook = async (bookData: IBook): Promise<IBook | null> => {
  const result = Book.create(bookData)
  return result
}

export const bookService = { createBook }
