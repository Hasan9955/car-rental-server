import { Types } from "mongoose";
import { z } from "zod";

const timeStringSchema = z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time)
}, {
    message: 'Invalid time formate, expected "HH:MM" in 24 hours formate.'
})
const createBookingValidationSchema = z.object({
    body: z.object({
        date: z.string().datetime(),
        user: z.string(),
        car: z.string(),
        startTime: timeStringSchema,
        endTime: timeStringSchema.default(''),
        totalCost: z.number().default(0)
    })
})


const updateBookingValidationSchema = z.object({
    body: z.object({
        date: z.string().datetime().optional(),
        user: z.string().optional(),
        car: z.string().optional(),
        startTime: timeStringSchema.optional(),
        endTime: timeStringSchema.optional(),
        totalCost: z.number().optional()
    })
})


const returnCarValidation = z.object({
    body: z.object({
        bookingId: z.string(),
        endTime: timeStringSchema
    })
})


export const bookingValidationSchema = {
    createBookingValidationSchema,
    updateBookingValidationSchema,
    returnCarValidation
}



