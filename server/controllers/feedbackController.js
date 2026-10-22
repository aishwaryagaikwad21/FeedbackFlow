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

        const {email, category, feedback, rating} = result.data

        const storeFeedback = new Feedback({
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