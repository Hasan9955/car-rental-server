"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const booking_service_1 = require("./booking.service");
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield booking_service_1.bookingServices.getAllBookings(query);
    res.status(200).json({
        success: true,
        message: 'Bookings retrieved successfully.',
        data: result
    });
}));
const getUserBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const { userId } = req.user;
    const result = yield booking_service_1.bookingServices.getUserBookings(userId, query);
    res.status(200).json({
        success: true,
        message: 'My Bookings retrieved successfully.',
        data: result
    });
}));
const getSingleBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.bookingServices.getSingleBooking(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Booking retrieved successfully.',
        data: result
    });
}));
const deleteBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.bookingServices.deleteBooking(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Booking deleted successfully.',
        data: result
    });
}));
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const payload = req.body;
    const result = yield booking_service_1.bookingServices.createBooking(payload, userId);
    res.status(200).json({
        success: true,
        message: 'Car booked successfully.',
        data: result
    });
}));
const updateBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const payload = req.body;
    const result = yield booking_service_1.bookingServices.updateBooking(id, payload);
    res.status(200).json({
        success: true,
        message: 'Booking updated successfully.',
        data: result
    });
}));
const createPaymentIntent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { price } = req.body;
    const result = yield booking_service_1.bookingServices.createPaymentIntent(price);
    res.status(200).json({
        success: true,
        message: 'Payment intent created successfully!',
        data: result
    });
}));
exports.bookingControllers = {
    getAllBookings,
    getUserBookings,
    getSingleBooking,
    createBooking,
    updateBooking,
    deleteBooking,
    createPaymentIntent
};
