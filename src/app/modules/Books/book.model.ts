import { Schema, model } from 'mongoose'
import { IBook } from './book.interface'

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publication_year: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: false },
    rating: { type: Number, required: false },
    image: { type: String, required: false },
    reviews: { type: String, required: false },
    ownerUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Book = model<IBook>('Book', bookSchema)
