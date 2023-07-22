import express from 'express'
// import auth from '../../middlewares/auth'
// import validateRequest from '../../middlewares/validateRequest'
import { bookControllar } from './book.controllar'
// import { bookValidation } from './book.validation'

const router = express.Router()

router.post(
  '/create-book',
  // auth(),
  // validateRequest(bookValidation.bookZodSchema),
  bookControllar.createBook,
)
router.get('/filter', bookControllar.getFilterBooks)

router.get('/search', bookControllar.getSearchBooks)
router.get('/tenBook', bookControllar.getTenBooks)
router.post('/reviews/:id', bookControllar.postBookReview)

router.get('/reviews/:id', bookControllar.getBookReview)

router.get('/:id', bookControllar.getSingleBook)

router.get('/', bookControllar.getAllBooks)

router.patch(
  '/:id',
  // auth(),
  bookControllar.updateBook,
)
router.delete(
  '/:id',
  // auth(),
  bookControllar.DeleteBook,
)

export const bookRoute = router
