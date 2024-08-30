import express from 'express'
import { userRoutes } from '../modules/User/user.route';
import { carRoutes } from '../modules/Car/car.route';
import { bookingRoutes } from '../modules/Booking/booking.route';
import { authRoutes } from '../modules/Auth/auth.route';

const router = express.Router();

const allRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/cars',
        route: carRoutes
    },
    {
        path: '/bookings',
        route: bookingRoutes
    }

]

allRoutes.forEach((route) => router.use(route.path, route.route) )

export default router;