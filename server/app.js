import express from 'express'
import cors from 'cors'

//import routers

const app = express()

const allowedOrigins = [
    'http://localhost:5173',

]

app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json())


export default app