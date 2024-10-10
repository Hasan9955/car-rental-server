import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validate.request";
import { userValidation } from "./user.validation";


const router = Router();


router.get('/', userControllers.getUsers)

router.get('/:id', userControllers.getSingleUser)

router.post('/create-user', validateRequest(userValidation.createUserValidationSchema), userControllers.createUser)

router.put('/:id', validateRequest(userValidation.updateUserValidationSchema), userControllers.updateUser)

router.delete('/:id', userControllers.deleteUser)


export const userRoutes = router;