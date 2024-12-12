"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidationSchema = void 0;
const zod_1 = require("zod");
const timeStringSchema = zod_1.z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-4]):[0-5][0-9]$/;
    return regex.test(time);
}, {
    message: 'Invalid time formate, expected "HH:MM" in 24 hours formate.'
});
const dateStringSchema = zod_1.z.string().refine((date) => {
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    return dateRegex.test(date);
}, {
    message: 'Invalid date formate, expected formate "YYYY-MM-DD".'
});
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: dateStringSchema,
        user: zod_1.z.string(),
        car: zod_1.z.string(),
        status: zod_1.z.enum(['PENDING', 'APPROVED', 'UNPAID', 'PAID']).default('PENDING'),
        startTime: timeStringSchema,
        endTime: timeStringSchema.default('').optional(),
        totalCost: zod_1.z.number().default(0).optional()
    })
});
const updateBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: dateStringSchema.optional(),
        prickUp: zod_1.z.string().optional(),
        dropOff: zod_1.z.string().optional(),
        userId: zod_1.z.string().optional(),
        carId: zod_1.z.string().optional(),
        transactionId: zod_1.z.string().optional(),
        status: zod_1.z.enum(['PENDING', 'APPROVED', 'UNPAID', 'PAID']).optional(),
        startTime: timeStringSchema.optional(),
        endTime: timeStringSchema.optional(),
        totalCost: zod_1.z.number().optional()
    })
});
const returnCarValidation = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string(),
        endTime: timeStringSchema
    })
});
exports.bookingValidationSchema = {
    createBookingValidationSchema,
    updateBookingValidationSchema,
    returnCarValidation
};
