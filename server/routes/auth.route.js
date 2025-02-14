import { Router } from 'express'
import { register, login } from '../controllers/auth.controller.js'

const router = Router()

// register route
router.post('/register', register)

// login route
router.post('/login', login)

export const authRoutes = router
