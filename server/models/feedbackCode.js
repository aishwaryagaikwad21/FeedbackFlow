import mongoose, { Mongoose } from "mongoose";
import Feedback from "./feedbackModel.js";

const feedbackCodeSchema = new mongoose.Schema({
    feedbackCode:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    feedbackId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback",
        required: true
    }
})

const FeedbackCode = mongoose.model("FeedbackCode", feedbackCodeSchema)

export default FeedbackCode
