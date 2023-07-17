import { Schema, model } from 'mongoose'
import { IBook } from './book.interface'

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publication_year: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: false },
    reviews: { type: String, required: false },
  },
  { timestamps: true },
)

export const Book = model<IBook>('Book', bookSchema)
