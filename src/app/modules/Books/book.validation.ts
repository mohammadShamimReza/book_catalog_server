import { z } from 'zod'

const bookZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
    author: z.string({ required_error: 'author is required' }),
    genre: z.string({ required_error: 'genre is required' }),
    publication_year: z.number({
      required_error: 'publication year is required',
    }),
    description: z.string({ required_error: 'description is required' }),
    price: z.number({ required_error: 'price is required' }),
    rating: z.number({ required_error: 'rating is required' }).optional(),
    image: z.string({ required_error: 'image is required' }).optional(),
    reviews: z.string().optional(),
    ownerUser: z.string({ required_error: 'ownerUser is required' }),
  }),
})

export const bookValidation = { bookZodSchema }
