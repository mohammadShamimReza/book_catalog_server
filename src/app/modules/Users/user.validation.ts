import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'password is required' }),
    phone: z.string({ required_error: 'phone is required' }),
    address: z.string({ required_error: 'address is required' }),
    name: z.object({
      firstName: z.string({ required_error: 'first name is required' }),
      lastName: z.string({ required_error: 'last name is required' }),
    }),
  }),
})

export const UserValidation = {
  createUserZodSchema,
}
