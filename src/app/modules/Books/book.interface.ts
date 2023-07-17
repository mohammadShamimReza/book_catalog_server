import { Model } from 'mongoose'

export type IBook = {
  title: string
  author: string
  genre: string
  publication_date: number
  isbn: string
  description: string
  price: number
  rating: number
  image: string
  reviews?: string
}

export type BookModel = Model<IBook, Record<string, unknown>>
