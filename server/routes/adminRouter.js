import express from 'express'
import { auth } from '../middleware/auth.js'
import { 
    registerAdmin,
    loginAdmin,
    deleteFeedbackByAdmin
} from '../controllers/adminController.js'

const router = express.Router()

router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.delete('/delete/:id', auth, deleteFeedbackByAdmin)

export default router