import { z } from "zod"; 

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6, {message: 'Password should be minimum 6 character.'}).max(20, { message: 'password can not be more then 20 character' }),
        role: z.enum(['admin', 'user']).optional(),
        phone: z.string(),
        photo: z.string().default('https://i.ibb.co.com/5j6sv2R/anonymous2.webp'),
        address: z.string(),
        isDeleted: z.boolean().default(false)
    })
})


const updateUserValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        password: z.string().min(6, {message: 'Password should be minimum 6 character.'}).max(20, { message: 'password can not be more then 20 character' }).optional(),
        role: z.enum(['admin', 'user']).optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        isDeleted: z.boolean().optional()
    })
})


export const userValidation = {
    createUserValidationSchema,
    updateUserValidationSchema
}