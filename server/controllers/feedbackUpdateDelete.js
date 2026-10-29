import Feedback from "../models/feedbackModel.js";
import { feedbackValidation, updatedFeedbackValidation } from "../validators/feedbackValidator.js";
import { hashVerification } from "../services/tokenVerification.js";
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
        const verifyHash = hashVerification(editToken, feedback.editTokenHash)

        if(!verifyHash) {
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

export const updateFeedback = async (req, res) => {

    const feedbackId = req.params.feedbackId
    const editToken = req.get('X-Feedback-Token')
    
    const updates = Object.keys(req.body)
    const allowedEdit = ['name', 'email', 'category', 'feedback', 'rating']
    const isValidEdit = updates.every((edit) => allowedEdit.includes(edit));

    if(!isValidEdit){
        return res.status(400).json({
            error:'invalid update'
        })
    }

    const result = updatedFeedbackValidation.safeParse(req.body)

    if(!result.success){
        return res.status(400).send({error: 'Invalid inputs'})
    }

    try{
        const feedback = await Feedback.findById({_id:feedbackId}).select("+editTokenHash");
        if(!feedback){
            return res.status(404).json({
                message: 'Feedback Not Found'
            })
        }

        const verifyHash = hashVerification(editToken, feedback.editTokenHash)
        
        if(!verifyHash) {
            return res.status(403).json({
                message: "Invalid edit token"
            });
        }

        Object.assign(feedback, result.data);

        await feedback.save()
        res.status(200).send(feedback)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:'error occurred'
        })
    }
}