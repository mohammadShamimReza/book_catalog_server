import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { bookControllar } from './book.controllar'
import { bookValidation } from './book.validation'

const router = express.Router()

router.post(
  '/create-book',
  validateRequest(bookValidation.bookZodSchema),
  bookControllar.createBook,
)
router.get('/', bookControllar.getBooks)

export const bookRoute = router
