import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import validateRequest from "../../middlewares/validate.request";
import { bookingValidationSchema } from "./booking.validation";
import authValidator from "../../middlewares/auth.validator";


const router = Router();

router.get('/', authValidator('admin'), bookingControllers.getAllBookings)

router.get('/my-bookings', 
    authValidator('user'), 
    bookingControllers.getUserBookings)

router.post('/',
    authValidator('user'),
    validateRequest(bookingValidationSchema.createBookingValidationSchema),
    bookingControllers.createBooking)

router.patch('/update',
    validateRequest(bookingValidationSchema.updateBookingValidationSchema),
    bookingControllers.updateBooking)


export const bookingRoutes = router;