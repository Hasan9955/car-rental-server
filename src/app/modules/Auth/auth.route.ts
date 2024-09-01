import { Router } from "express";
import validateRequest from "../../middlewares/validate.request";
import { userControllers } from "../User/user.controller";
import { userValidation } from "../User/user.validation";
import { signInValidationSchema } from "./auth.validation";
import { authControllers } from "./auth.controller";


const router = Router();


router.post('/signup', 
    validateRequest(userValidation.createUserValidationSchema), 
    userControllers.createUser)

router.post('/signin', 
    validateRequest(signInValidationSchema), 
    authControllers.signIn)



export const authRoutes = router;