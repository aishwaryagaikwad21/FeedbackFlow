import express from 'express'
import { 
    writeFeedback,
    getAllFeedbacks,
    getFeedbackByCategory
} from '../controllers/feedbackController.js'

const router = new express.Router()

router.post('/write', writeFeedback)
router.get('/allFeedbacks', getAllFeedbacks)
router.get('/feedback/:category', getFeedbackByCategory)

export default router
