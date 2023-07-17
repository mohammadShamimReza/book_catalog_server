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
router.get('/filter', bookControllar.getFilterBooks)

router.get('/', bookControllar.getBooks)

router.patch('/:id', bookControllar.updateBook)
router.delete('/:id', bookControllar.DeleteBook)

export const bookRoute = router
