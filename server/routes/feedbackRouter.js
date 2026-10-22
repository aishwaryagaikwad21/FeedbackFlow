import express from 'express'
import { 
    writeFeedback,
    getAllFeedbacks
} from '../controllers/feedbackController.js'

const router = new express.Router()

router.post('/write', writeFeedback)
router.get('/allFeedbacks', getAllFeedbacks)

export default router
