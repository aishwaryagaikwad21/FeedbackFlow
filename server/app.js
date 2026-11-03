import express from 'express'
import cors from 'cors'

//import routers
import adminRouter from './routes/adminRouter.js'
import feedbackRouter from './routes/feedbackRouter.js'

const app = express()

const allowedOrigins = [
    'http://localhost:5173',
    'process.env.FRONTEND_URI'
]

app.use(cors({
  origin: allowedOrigins
})); 

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to FeedbackFlow API'
    })
})

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'FeedbackFlow API is running'
    })
})

app.use('/admin/auth',adminRouter)
app.use('/feedbackFlow', feedbackRouter)

export default app