import Feedback from "../models/feedbackModel.js";
import { feedbackValidation } from "../validators/feedbackValidator.js";
import { randomBytes, createHash, timingSafeEqual } from "node:crypto";

export const writeFeedback = async (req, res) => {

    //validate feedback
    const result = feedbackValidation.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({
            message: 'Invalid input',
            errors: result.error.issues
        })
    }

    try{

        const {name, email, category, feedback, rating} = result.data

        const editToken = randomBytes(32).toString("hex");
        const editTokenHash = createHash("sha256").update(editToken).digest("hex")

        const storeFeedback = new Feedback({
            name,
            email,
            category, 
            feedback,
            rating,
            editTokenHash
        })
        const saveFeedback = await storeFeedback.save()

        return res.status(201).json({
            message: "Feedback submitted successfully",
            feedbackId: saveFeedback._id,
            editToken
        })
        
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            message: 'Error Occurred',
            error: err
        })
    }
}

export const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
            .select("-_id name category feedback rating createdAt")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: feedbacks.length,
            feedbacks
        });
    } catch (err) {
        console.error("Error fetching feedback:", err);

        return res.status(500).json({
            message: "Failed to retrieve feedback"
        });
    }
};

export const getFeedbackByCategory = async (req, res) => {
    try{
        const category = req.params.category

        const feedbacksCollection = await Feedback.find({category}).select("-_id name category feedback rating createdAt")

        if(!feedbacksCollection){
            return res.status(404).json({
                message: 'Not Found'
            })
        }

        return res.status(200).json({
            feedbacksCollection
        })
    }
    catch(err){
        console.log('Error Occurred', err)
        return res.status(500).send('Error Occurred')
    }
}

export const getFeedbacksByEmail = async (req, res) => {
    
    const mail = req.params.email

    if (!mail) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    try {
        const feedbacks = await Feedback.find({
            email: mail
        })
        .select("-editTokenHash")

        if(feedbacks.length === 0){
            return res.status(404).json({
                message: 'No feedback found'
            })
        }

        return res.status(200).json({
            count: feedbacks.length,
            feedbacks
        });

    } catch (err) {
        console.error("Error fetching feedbacks by email:", err);

        return res.status(500).json({
            message: "Failed to retrieve feedbacks"
        });
    }
};
