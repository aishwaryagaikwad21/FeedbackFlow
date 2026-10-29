import { Admin } from "../models/adminModel.js";
import Feedback from "../models/feedbackModel.js";

import { 
    adminRegistrationValidation, 
    adminLoginValidation } from "../validators/adminValidators.js";

export const registerAdmin = async (req, res) => {

    const result = adminRegistrationValidation.safeParse(req.body)
    if(!result.success){
        return res.status(400).send({
            message: 'Invalid input',
            errors: result.error.issues
        })
    }

    try{
         const { name, email, password } = result.data;

         // Check whether the email is already registered
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
        return res.status(409).json({
            message: "An admin with this email already exists",
        });
        }

        const admin = new Admin({
            name,
            email,
            password,
            role: "admin",
        });

        const savedAdmin = await admin.save();
        const token = await savedAdmin.generateAuthToken()
        const adminObject = savedAdmin.toObject();
        const { password: _, ...adminWithoutPassword } = adminObject;

        return res.status(201).json({
            message: "Admin registered successfully",
            admin: adminWithoutPassword,
            token
        });
    }
    catch(err){
        console.error("Admin registration error:", err);

        if (err.code === 11000) {
            return res.status(409).json({
                message: "An admin with this email already exists"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const loginAdmin = async (req, res) => {

    const result = adminLoginValidation.safeParse(req.body)
    if(!result.success){
        return res.status(400).send({
            message: 'Invalid inputs',
            errors: result.error.issues
        })
    }
    try{
        const admin = await Admin.findByCredentials(result.data.email, result.data.password)
        const token = await admin.generateAuthToken();
        res.status(200).send({admin, token})
    }
    catch(err){
        res.status(401).send({
            message: "Invalid email or password"
        })
    }
} 

export const deleteFeedbackByAdmin = async (req, res) => {
    const  feedbackId  = req.params.id;

    try {
        const feedback = await Feedback.findById({_id: feedbackId});

        if (!feedback) {
            return res.status(404).json({
                message: "Feedback not found"
            });
        }

        await feedback.deleteOne();

        return res.status(200).json({
            message: "Feedback deleted successfully",
            feedbackId: feedback._id
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Failed to delete feedback"
        });
    }
};