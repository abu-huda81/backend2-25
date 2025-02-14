import Router from 'express'
import {authRoutes} from './auth.route.js'
import { userRoutes } from './user.route.js'
import { productRoutes } from './product.route.js'

const router = Router()

const basic = '/api/v1'

router.use(`${basic}/auth`, authRoutes)
router.use(`${basic}/users`, userRoutes)
router.use(`${basic}/products`, productRoutes)

export default router
