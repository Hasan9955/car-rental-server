import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validate.request";
import { userValidation } from "./user.validation";


const router = Router();


router.get('/', userControllers.getUsers)

router.get('/:id', userControllers.getSingleUser)

router.post('/create-user', validateRequest(userValidation.createUserValidationSchema), userControllers.createUser)

router.patch('/update-user/:id', validateRequest(userValidation.updateUserValidationSchema), userControllers.updateUser)



export const userRoutes = router;