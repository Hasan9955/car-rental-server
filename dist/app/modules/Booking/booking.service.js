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
exports.bookingServices = void 0;
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const car_model_1 = require("../Car/car.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const booking_model_1 = require("./booking.model");
const config_1 = __importDefault(require("../../config"));
const stripe = require('stripe')(config_1.default.strip_key);
const getAllBookings = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId, date, status } = query;
    let statusArray = null;
    if (status) {
        statusArray = status.split('-');
    }
    if (carId && date) {
        const result = yield booking_model_1.Booking.find({
            car: carId,
            date: date
        })
            .populate('user')
            .populate('car');
        return result ? result : 'No booking matched with this query.';
    }
    if (carId) {
        const result = yield booking_model_1.Booking.find({
            car: carId
        })
            .populate('user')
            .populate('car');
        return result ? result : 'No booking matched with this Car ID.';
    }
    if (date) {
        const result = yield booking_model_1.Booking.find({
            date
        })
            .populate('user')
            .populate('car');
        return result ? result : 'No booking matched with this Date.';
    }
    const result = yield booking_model_1.Booking.find({
        status: { $nin: statusArray }
    }).sort({
        createdAt: -1
    })
        .populate('user')
        .populate('car');
    return result;
});
const getUserBookings = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryValue = query.query;
    let queryArray = null;
    if (queryValue) {
        queryArray = queryValue.split('-');
    }
    const result = yield booking_model_1.Booking.find({
        user: userId,
        status: { $nin: queryArray }
    }).sort({
        createdAt: -1
    })
        .populate('user')
        .populate('car');
    return result;
});
const getSingleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findById(id)
        .populate('user')
        .populate('car');
    return result;
});
const createBooking = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = {
        car: payload.car,
        startTime: payload.startTime,
        date: payload.date,
        user: userId,
    };
    const inputDate = new Date(bookingData.date);
    const today = new Date();
    // Set time to the start of the day for accurate comparison
    today.setHours(0, 0, 0, 0);
    // Calculate one year from today
    const oneYearFromToday = new Date(today);
    oneYearFromToday.setFullYear(today.getFullYear() + 1);
    // Validate the date is not in the past and not more than one year from today
    if (inputDate < today) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'You can not set date in the past!');
    }
    if (inputDate > oneYearFromToday) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'You can not set date bigger then 1 year!');
    }
    const isBookingAlreadyExists = yield booking_model_1.Booking.findOne({ car: payload.car, date: payload.date });
    if (isBookingAlreadyExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'This car is already booked for requested day!');
    }
    const updateCarStatus = yield car_model_1.Car.findByIdAndUpdate(bookingData.car, {
        status: 'unavailable'
    }, {
        runValidators: true,
        new: true
    });
    if (!updateCarStatus) {
        throw new AppError_1.default(404, 'Car not found!');
    }
    const result = yield booking_model_1.Booking.create(bookingData);
    if (result) {
        const createdBooking = yield booking_model_1.Booking.findById(result._id)
            .populate('user')
            .populate('car');
        return createdBooking;
    }
    return result;
});
const updateBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const requestedBooking = yield booking_model_1.Booking.findById(id);
    if (!requestedBooking) {
        throw new AppError_1.default(404, 'This id is not exists!');
    }
    const mergedData = (0, lodash_merge_1.default)(requestedBooking, payload);
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, mergedData, {
        new: true,
        runValidators: true
    });
    return result;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndDelete(id);
    return result;
});
const createPaymentIntent = (price) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = parseInt((price * 100).toString());
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ['card']
    });
    return {
        clientSecret: paymentIntent.client_secret
    };
});
exports.bookingServices = {
    getAllBookings,
    getUserBookings,
    getSingleBooking,
    createBooking,
    updateBooking,
    deleteBooking,
    createPaymentIntent
};
