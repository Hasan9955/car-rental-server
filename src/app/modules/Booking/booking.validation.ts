import { Types } from "mongoose";
import { z } from "zod";

const timeStringSchema = z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-4]):[0-5][0-9]$/;
    return regex.test(time)
}, {
    message: 'Invalid time formate, expected "HH:MM" in 24 hours formate.'
})

const dateStringSchema = z.string().refine((date) => {
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
    return dateRegex.test(date)
}, {
    message: 'Invalid date formate, expected formate "YYYY-MM-DD".'
})
const createBookingValidationSchema = z.object({
    body: z.object({
        date: dateStringSchema,  
        user: z.string(),
        car: z.string(),
        startTime: timeStringSchema,
        endTime: timeStringSchema.default('').optional(),
        totalCost: z.number().default(0).optional()
    })
})


const updateBookingValidationSchema = z.object({
    body: z.object({
        date: dateStringSchema.optional(), 
        prickUp: z.string().optional(),
        dropOff: z.string().optional(),
        userId: z.string().optional(),
        carId: z.string().optional(),
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



