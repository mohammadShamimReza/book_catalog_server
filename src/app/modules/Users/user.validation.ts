import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }).email(),
    password: z.string({ required_error: 'password is required' }),
    phone: z.string({ required_error: 'phone is required' }),
    address: z.string({ required_error: 'address is required' }),
    name: z.string({ required_error: 'name is required' }),
  }),
})

export const UserValidation = {
  createUserZodSchema,
}
