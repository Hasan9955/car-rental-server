import { Router } from "express";
import { carControllers } from "./car.controller";
import validateRequest from "../../middlewares/validate.request";
import { carValidationSchema } from "./car.validation";
import authValidator from "../../middlewares/auth.validator";


const router = Router();

router.get('/', carControllers.getAllCars)

router.get('/:id', carControllers.getSingleCar)

router.post('/', authValidator('admin'), validateRequest(carValidationSchema.createCarValidationSchema), carControllers.createCar)

router.put('/:id', authValidator('admin'), validateRequest(carValidationSchema.updateCarValidationSchema), carControllers.updateCar)

router.delete('/:id', authValidator('admin'), carControllers.deleteCar)


export const carRoutes = router;