import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import validateRequest from "../../middlewares/validate.request";
import { bookingValidationSchema } from "./booking.validation";
import authValidator from "../../middlewares/auth.validator";


const router = Router();

router.get('/', authValidator('admin'), bookingControllers.getAllBookings)

router.get('/my-bookings',
    authValidator('user', 'admin'),
    bookingControllers.getUserBookings)

router.get('/:id', 
    authValidator('user', 'admin'),
    bookingControllers.getSingleBooking);

router.post('/',
    authValidator('user', 'admin'),
    validateRequest(bookingValidationSchema.createBookingValidationSchema),
    bookingControllers.createBooking)

router.put('/:id',
    authValidator('admin', 'user'),
    validateRequest(bookingValidationSchema.updateBookingValidationSchema),
    bookingControllers.updateBooking)

router.delete('/:id',
    authValidator('admin', 'user'),
    bookingControllers.deleteBooking
)

// payment route 

router.post('/create-payment-intent', bookingControllers.createPaymentIntent)

export const bookingRoutes = router;