import { z } from "zod";


export const signInValidationSchema = z.object({
    body: z.object({
        email: z.string(),
        password: z.string()
    })
})
 