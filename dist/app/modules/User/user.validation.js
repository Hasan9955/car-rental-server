"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
// const NameValidationSchema = z.object({
//     firstName: z.string({
//         required_error: 'First name is required.'
//     }),
//     middleName: z.string().optional(),
//     lastName: z.string({
//         required_error: 'Last name is required.'
//     })
// })
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        password: zod_1.z.string().min(6, { message: 'Password should be minimum 6 character.' }).max(20, { message: 'password can not be more then 20 character' }),
        role: zod_1.z.enum(['admin', 'user']),
        phone: zod_1.z.string(),
        address: zod_1.z.string(),
        isDeleted: zod_1.z.boolean().default(false)
    })
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().min(6, { message: 'Password should be minimum 6 character.' }).max(20, { message: 'password can not be more then 20 character' }).optional(),
        role: zod_1.z.enum(['admin', 'user']).optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().optional()
    })
});
exports.userValidation = {
    createUserValidationSchema,
    updateUserValidationSchema
};
