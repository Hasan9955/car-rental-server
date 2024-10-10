import { Router } from "express";
import validateRequest from "../../middlewares/validate.request";
import { userControllers } from "../User/user.controller";
import { userValidation } from "../User/user.validation";
import { forgetPasswordValidation, refreshTokenValidationSchema, resetPasswordValidation, signInValidationSchema } from "./auth.validation";
import { authControllers } from "./auth.controller";


const router = Router();


router.post('/signup', 
    validateRequest(userValidation.createUserValidationSchema), 
    userControllers.createUser)

router.post('/login', 
    validateRequest(signInValidationSchema), 
    authControllers.signIn)

router.post('/refresh-token', 
    validateRequest(refreshTokenValidationSchema), 
    authControllers.signIn)

router.post('/forgetPassword', validateRequest(forgetPasswordValidation), authControllers.forgetPassword)

router.post('/resetPassword', validateRequest(resetPasswordValidation), authControllers.resetPassword)


export const authRoutes = router;