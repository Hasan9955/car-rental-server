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
        carId: zod_1.z.string(),
        startTime: timeStringSchema,
        endTime: timeStringSchema.default('').optional(),
        totalCost: zod_1.z.number().default(0).optional()
    })
});
const updateBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: dateStringSchema.optional(),
        carId: zod_1.z.string().optional(),
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
