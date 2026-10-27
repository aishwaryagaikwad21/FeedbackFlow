import express from 'express'
import { 
    writeFeedback,
    getAllFeedbacks,
    getFeedbackByCategory,
    getFeedbackByemailId
} from '../controllers/feedbackController.js'

import { deleteFeedback } from '../controllers/feedbackUpdateDelete.js'

const router = new express.Router()

router.post('/write', writeFeedback)
router.get('/allFeedbacks', getAllFeedbacks)
router.get('/feedback/:category', getFeedbackByCategory)
router.get('/email/:email', getFeedbackByemailId)
router.delete('/delete/:feedbackId', deleteFeedback)

export default router
