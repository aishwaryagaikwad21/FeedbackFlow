import {z} from 'zod';

export const adminRegistrationValidation = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters"),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"),
})

export const adminLoginValidation = z.object({
    email: z.string().trim().email("Invalid Email!"),
    password: z.string().trim().min("8", "Password required!")
})