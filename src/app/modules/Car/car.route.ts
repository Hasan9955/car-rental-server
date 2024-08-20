import { Router } from "express";
import { carControllers } from "./car.controller";
import validateRequest from "../../middlewares/validate.request";
import { carValidationSchema } from "./car.validation";


const router = Router();

router.get('/', carControllers.getAllCars)

router.get('/:id', carControllers.getSingleCar)

router.post('/', validateRequest(carValidationSchema.createCarValidationSchema), carControllers.createCar)

router.put('/:id', validateRequest(carValidationSchema.updateCarValidationSchema), carControllers.updateCar)

router.delete('/:id', carControllers.deleteCar)


export const carRoutes = router;