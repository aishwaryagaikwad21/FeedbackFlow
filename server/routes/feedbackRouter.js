import express from 'express'
import { writeFeedback } from '../controllers/feedbackController.js'

const router = new express.Router()

router.post('/write', writeFeedback)

export default router
