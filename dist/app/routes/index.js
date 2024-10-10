"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/User/user.route");
const car_route_1 = require("../modules/Car/car.route");
const booking_route_1 = require("../modules/Booking/booking.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const router = express_1.default.Router();
const allRoutes = [
    {
        path: '/auth',
        route: auth_route_1.authRoutes
    },
    {
        path: '/users',
        route: user_route_1.userRoutes
    },
    {
        path: '/cars',
        route: car_route_1.carRoutes
    },
    {
        path: '/bookings',
        route: booking_route_1.bookingRoutes
    }
];
allRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
