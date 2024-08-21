import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import validateRequest from "../../middlewares/validate.request";
import { bookingValidationSchema } from "./booking.validation";


const router = Router();

router.get('/', bookingControllers.getAllBookings)

router.get('/my-bookings', bookingControllers.getSingleBooking)

router.post('/',
    validateRequest(bookingValidationSchema.createBookingValidationSchema),
    bookingControllers.createBooking)

router.put('/return',
    validateRequest(bookingValidationSchema.returnCarValidation),
    bookingControllers.returnCar)

router.patch('/update',
    validateRequest(bookingValidationSchema.updateBookingValidationSchema),
    bookingControllers.updateBooking)