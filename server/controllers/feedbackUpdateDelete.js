import Feedback from "../models/feedbackModel.js";
import { feedbackValidation, updatedFeedbackValidation } from "../validators/feedbackValidator.js";
import { randomBytes, createHash, timingSafeEqual } from "node:crypto";

export const deleteFeedback = async (req, res) => {

    const feedbackId = req.params.feedbackId
    const editToken = req.get("X-Feedback-Token")

    if(!editToken){
        return res.status(401).json({
            message: "Edit Token is required"
        })
    }

    try{
        const feedback = await Feedback.findById({_id: feedbackId}).select("+editTokenHash");

        if(!feedback){
            return res.status(404).json({
                message: 'Feedback not found'
            })
        }

        //Hash the token received from the frontend
        const suppliedHash = createHash("sha256").update(editToken).digest()

        const storedHash = Buffer.from(feedback.editTokenHash, "hex")

        if( storedHash.length !== suppliedHash.length || !timingSafeEqual(suppliedHash, storedHash)) 
        {
            return res.status(403).json({
                message: "Invalid edit token"
            });
        }

        await feedback.deleteOne()
        return res.status(200).json({
            message: "Feedback deleted successfully",
            feedbackId: feedback._id
        });

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message: 'Failed to delete feedback',
        })
    }
}