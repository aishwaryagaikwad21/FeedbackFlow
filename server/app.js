import express from 'express'
import cors from 'cors'

//import routers
import adminRouter from './routes/adminRouter.js'
import feedbackRouter from './routes/feedbackRouter.js'

const app = express()

const allowedOrigins = [
    'http://localhost:5173',

]

app.use(cors({
  origin: allowedOrigins
})); 

app.use(express.json())

app.use('/admin/auth',adminRouter)
app.use('/feedbackFlow', feedbackRouter)

export default app