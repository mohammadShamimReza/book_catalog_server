import { z } from 'zod'

const bookZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
    author: z.string({ required_error: 'title is required' }),
    genre: z.string({ required_error: 'title is required' }),
    publication_data: z.number({ required_error: 'title is required' }),
    isbn: z.string({ required_error: 'title is required' }),
    description: z.string({ required_error: 'title is required' }),
    price: z.number({ required_error: 'title is required' }),
    rating: z.number({ required_error: 'title is required' }),
    image: z.string({ required_error: 'title is required' }),
    reviews: z.string().optional(),
  }),
})

export const bookValidation = { bookZodSchema }
