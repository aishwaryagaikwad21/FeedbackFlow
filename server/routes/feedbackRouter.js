import express from 'express'
import { 
    writeFeedback,
    getAllFeedbacks,
    getFeedbackByCategory,
    getFeedbacksByEmail
} from '../controllers/feedbackController.js'

import { deleteFeedback, updateFeedback } from '../controllers/feedbackUpdateDelete.js'

const router = new express.Router()

router.post('/write', writeFeedback)
router.get('/allFeedbacks', getAllFeedbacks)
router.get('/feedback/:category', getFeedbackByCategory)
router.get('/email/:email', getFeedbacksByEmail)
router.delete('/delete/:feedbackId', deleteFeedback)
router.patch('/update/:feedbackId', updateFeedback)

export default router
