"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const validate_request_1 = __importDefault(require("../../middlewares/validate.request"));
const booking_validation_1 = require("./booking.validation");
const auth_validator_1 = __importDefault(require("../../middlewares/auth.validator"));
const router = (0, express_1.Router)();
router.get('/', (0, auth_validator_1.default)('admin'), booking_controller_1.bookingControllers.getAllBookings);
router.get('/my-bookings', (0, auth_validator_1.default)('user', 'admin'), booking_controller_1.bookingControllers.getUserBookings);
router.get('/:id', (0, auth_validator_1.default)('user', 'admin'), booking_controller_1.bookingControllers.getSingleBooking);
router.post('/', (0, auth_validator_1.default)('user', 'admin'), (0, validate_request_1.default)(booking_validation_1.bookingValidationSchema.createBookingValidationSchema), booking_controller_1.bookingControllers.createBooking);
router.put('/:id', (0, auth_validator_1.default)('admin', 'user'), (0, validate_request_1.default)(booking_validation_1.bookingValidationSchema.updateBookingValidationSchema), booking_controller_1.bookingControllers.updateBooking);
router.delete('/:id', (0, auth_validator_1.default)('admin', 'user'), booking_controller_1.bookingControllers.deleteBooking);
// payment route 
router.post('/create-payment-intent', booking_controller_1.bookingControllers.createPaymentIntent);
exports.bookingRoutes = router;
