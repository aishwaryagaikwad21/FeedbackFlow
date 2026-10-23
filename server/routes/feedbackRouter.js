import express from 'express'
import { 
    writeFeedback,
    getAllFeedbacks,
    getFeedbackByCategory,
    getFeedbackByemailId
} from '../controllers/feedbackController.js'

const router = new express.Router()

router.post('/write', writeFeedback)
router.get('/allFeedbacks', getAllFeedbacks)
router.get('/feedback/:category', getFeedbackByCategory)
router.get('/email/:email', getFeedbackByemailId)

export default router
