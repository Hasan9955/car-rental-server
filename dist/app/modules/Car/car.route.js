"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRoutes = void 0;
const express_1 = require("express");
const car_controller_1 = require("./car.controller");
const validate_request_1 = __importDefault(require("../../middlewares/validate.request"));
const car_validation_1 = require("./car.validation");
const auth_validator_1 = __importDefault(require("../../middlewares/auth.validator"));
const booking_validation_1 = require("../Booking/booking.validation");
// import { bookingControllers } from "../Booking/booking.controller";
const router = (0, express_1.Router)();
router.get('/', car_controller_1.carControllers.getAllCars);
router.get('/:id', car_controller_1.carControllers.getSingleCar);
router.post('/', (0, auth_validator_1.default)('admin', 'user'), (0, validate_request_1.default)(car_validation_1.carValidationSchema.createCarValidationSchema), car_controller_1.carControllers.createCar);
router.delete('/:id', (0, auth_validator_1.default)('admin', 'user'), car_controller_1.carControllers.deleteCar);
//return the car
router.put('/return', (0, auth_validator_1.default)('admin', 'user'), (0, validate_request_1.default)(booking_validation_1.bookingValidationSchema.returnCarValidation), car_controller_1.carControllers.returnCar);
router.put('/:id', (0, auth_validator_1.default)('admin', 'user'), (0, validate_request_1.default)(car_validation_1.carValidationSchema.updateCarValidationSchema), car_controller_1.carControllers.updateCar);
exports.carRoutes = router;
