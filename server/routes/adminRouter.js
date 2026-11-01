import express from 'express'
import { auth } from '../middleware/auth.js'
import { 
    registerAdmin,
    loginAdmin,
    deleteFeedbackByAdmin
} from '../controllers/adminController.js'
import { getAdminStatistics } from '../controllers/dashboardController.js'

const router = express.Router()

router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.delete('/delete/:id', auth, deleteFeedbackByAdmin)
router.get('/statistics', auth, getAdminStatistics)

export default router