import { Router } from 'express'
import {
  getAllUsers,
  getLatestUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getAdmin,
  getUserStats,
} from '../controllers/user.controller.js'
import { verifyAdmin, verifyToken } from '../middleware/verifyToken.js'

const router = Router()

// get all users
router.get('/', verifyToken, verifyAdmin, getAllUsers)

// get latest users
router.get('/latest/:latest', getLatestUsers)

// get single user
router.get('/:id', getSingleUser)

// update user
router.put('/:id', verifyToken, updateUser)

// delete user
router.delete('/:id', verifyToken, verifyAdmin, deleteUser)

// get admin:
router.get('/get-admin/:id', verifyToken, verifyAdmin, getAdmin)

// get user stats
router.get('/stats', verifyToken, verifyAdmin, getUserStats)

export const userRoutes = router
