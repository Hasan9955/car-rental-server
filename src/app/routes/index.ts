import express from 'express'
import { userRoutes } from '../modules/User/user.route';
import { carRoutes } from '../modules/Car/car.route';

const router = express.Router();

const allRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/cars',
        route: carRoutes
    }

]

allRoutes.forEach((route) => router.use(route.path, route.route) )

export default router;