"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidation = exports.forgetPasswordValidation = exports.refreshTokenValidationSchema = exports.signInValidationSchema = void 0;
const zod_1 = require("zod");
exports.signInValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string()
    })
});
exports.refreshTokenValidationSchema = zod_1.z.object({
    cookie: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required.'
        })
    })
});
exports.forgetPasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string()
    })
});
exports.resetPasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        token: zod_1.z.string(),
        newPassword: zod_1.z.string()
    })
});
