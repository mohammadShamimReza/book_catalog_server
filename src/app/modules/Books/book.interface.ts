import { Model, Types } from 'mongoose'

export type IBook = {
  title: string
  author: string
  genre: string
  publication_year: number
  description: string
  price?: number
  rating?: number
  image?: string
  reviews?: string[]
  ownerUser: Types.ObjectId
}

export type BookModel = Model<IBook, Record<string, unknown>>
