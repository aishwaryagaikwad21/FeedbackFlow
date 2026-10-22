import {z} from 'zod'

export const feedbackValidation = z.object({
    email: z.string().trim().toLowerCase().email("Please enter a valid email address").max(254, "Email cannot exceed 254 characters"),
    category: z.enum(["product", "service", "app", "food", "travel", "shopping", "education", "entertainment", "other"],{error: "Please select a valid feedback category"}),
    feedback: z.string().trim().min(10, "Feedback must contain at least 10 characters").max(2000, "Feedback cannot exceed 2000 characters"),
    rating: z.number().int("Rating must be a whole number").min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5")
})