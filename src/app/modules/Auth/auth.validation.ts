import { z } from "zod";


export const signInValidationSchema = z.object({
    body: z.object({
        email: z.string(),
        password: z.string()
    })
})


export const refreshTokenValidationSchema = z.object({
    cookie: z.object({
        refreshToken: z.string({
            required_error: 'Refresh token is required.'
        })
    })
})

export const forgetPasswordValidation = z.object({
    body: z.object({
        email: z.string()
    })
})

export const resetPasswordValidation = z.object({
    body: z.object({
        email: z.string(),
        token: z.string(),
        newPassword: z.string()
    })
})
 