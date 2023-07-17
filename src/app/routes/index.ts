import express from 'express'
import { bookRoute } from '../modules/Books/book.router'
import { UserRouter } from '../modules/Users/user.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/books',
    route: bookRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
