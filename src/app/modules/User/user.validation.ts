import { z } from "zod";


// const NameValidationSchema = z.object({
//     firstName: z.string({
//         required_error: 'First name is required.'
//     }),
//     middleName: z.string().optional(),
//     lastName: z.string({
//         required_error: 'Last name is required.'
//     })
// })
 

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6, {message: 'Password should be minimum 6 character.'}).max(20, { message: 'password can not be more then 20 character' }),
        role: z.enum(['admin', 'user']),
        phone: z.string(),
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