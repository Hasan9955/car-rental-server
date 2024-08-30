import { Router } from "express";
import validateRequest from "../../middlewares/validate.request";
import { userControllers } from "../User/user.controller";
import { userValidation } from "../User/user.validation";


const router = Router();


router.post('/signup', validateRequest(userValidation.createUserValidationSchema), userControllers.createUser)

router.post('/signin')



export const authRoutes = router;