import 'dotenv/config.js'
import app from './app.js'
import connectDB from './db/mongoose.js'

const PORT = process.env.PORT || 5000

await connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})