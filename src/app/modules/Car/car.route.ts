import { Router } from "express";
import { carControllers } from "./car.controller";
import validateRequest from "../../middlewares/validate.request";
import { carValidationSchema } from "./car.validation";
import authValidator from "../../middlewares/auth.validator";
import { bookingValidationSchema } from "../Booking/booking.validation";
import { bookingControllers } from "../Booking/booking.controller";


const router = Router();

router.get('/', carControllers.getAllCars)

router.get('/:id', carControllers.getSingleCar)

router.post('/', authValidator('admin'), validateRequest(carValidationSchema.createCarValidationSchema), carControllers.createCar)

router.delete('/:id', authValidator('admin'), carControllers.deleteCar)

//return the car
router.put('/return',
    authValidator('admin'),
    validateRequest(bookingValidationSchema.returnCarValidation),
    carControllers.returnCar)

router.put('/:id', authValidator('admin'), validateRequest(carValidationSchema.updateCarValidationSchema), carControllers.updateCar)




export const carRoutes = router;