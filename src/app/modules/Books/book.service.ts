import { IBook } from './book.interface'
import { Book } from './book.model'

const createBook = async (bookData: IBook): Promise<IBook | null> => {
  const result = Book.create(bookData)
  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getBooks = async (searchBookData: any) => {
  const result = Book.find({
    $or: [
      { title: { $regex: searchBookData, $options: 'i' } },
      { author: { $regex: searchBookData, $options: 'i' } },
      { genre: { $regex: searchBookData, $options: 'i' } },
      { publication_date: { $regex: searchBookData, $options: 'i' } },
      { price: { $regex: searchBookData, $options: 'i' } },
      { rating: { $regex: searchBookData, $options: 'i' } },
    ],
  })
  console.log(typeof result, 'this is result')
  return result
}

export const bookService = { createBook, getBooks }
