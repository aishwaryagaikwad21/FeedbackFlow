import Feedback from "../models/feedbackModel.js";
import FeedbackCode from "../models/feedbackCode.js";
import { feedbackValidation } from "../validators/feedbackValidator.js";
import { generateShortFeedbackCode } from "../services/feedbackCodeService.js";

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

        const storeFeedback = new Feedback({
            name,
            email,
            category, 
            feedback,
            rating
        })
        const saveFeedback = await storeFeedback.save()
        
        //Generate a short feedback code
        const shortCode = await generateShortFeedbackCode()

        const storeShortCode = new FeedbackCode({
            feedbackCode: shortCode,
            feedbackId: saveFeedback._id
        })

        const saveShortCode = await storeShortCode.save()

        return res.status(201).json({saveFeedback, saveShortCode})
        
    }
    catch(err){
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