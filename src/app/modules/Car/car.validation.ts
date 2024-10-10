import { string, z } from "zod";


const createCarValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        photo: z.string(),
        description: z.string(),
        color: z.string(),
        isElectric: z.boolean(),
        status: z.enum(['available', 'unavailable']).default("available"),
        features: z.array(z.string()).optional(),
        pricePerHour: z.number(),
        isDeleted: z.boolean().default(false)
    })
})



const updateCarValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        photo: z.string(),
        description: z.string().optional(),
        color: z.string().optional(),
        isElectric: z.boolean().optional(),
        status: z.enum(['available', 'unavailable']).optional(),
        feature: z.array(z.string()).optional(),
        pricePerHour: z.number().optional(),
        isDeleted: z.boolean().optional()
    })
})



export const carValidationSchema = {
    createCarValidationSchema,
    updateCarValidationSchema
}