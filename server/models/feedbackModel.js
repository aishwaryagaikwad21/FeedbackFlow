import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },  
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    category:{
        type: String,
        required: true,
        enum: ["product", "service", "app", "food", "travel", "shopping", "education", "entertainment", "other"]
    },
    feedback: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 2000
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    editTokenHash: {
        type: String,
        select: false
    }
},
{timestamps: true}
)

const Feedback = mongoose.model("Feedback", feedbackSchema)

export default Feedback