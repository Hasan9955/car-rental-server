"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidationSchema = void 0;
const zod_1 = require("zod");
const timeStringSchema = zod_1.z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
}, {
    message: 'Invalid time formate, expected "HH:MM" in 24 hours formate.'
});
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().datetime(),
        user: zod_1.z.string(),
        car: zod_1.z.string(),
        startTime: timeStringSchema,
        endTime: timeStringSchema.default(''),
        totalCost: zod_1.z.number().default(0)
    })
});
const updateBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().datetime().optional(),
        user: zod_1.z.string().optional(),
        car: zod_1.z.string().optional(),
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
