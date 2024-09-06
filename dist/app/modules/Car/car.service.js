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
exports.carServices = void 0;
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const car_model_1 = require("./car.model");
const booking_model_1 = require("../Booking/booking.model");
const convertToHours_1 = require("../../utility/convertToHours");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const getAllCars = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.find();
    return result;
});
const getSingleCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findById(id);
    return result;
});
const createCar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.create(payload);
    return result;
});
const updateCar = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const requestedCar = yield car_model_1.Car.findById(id);
    const mergedData = (0, lodash_merge_1.default)(requestedCar, payload);
    const result = yield car_model_1.Car.findByIdAndUpdate(id, mergedData, {
        new: true,
        runValidators: true
    });
    return result;
});
const deleteCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findByIdAndUpdate(id, {
        isDeleted: true,
        status: "unavailable"
    }, {
        new: true,
        runValidators: true
    });
    return result;
});
const returnCar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = payload.bookingId;
    console.log(id);
    const isBookingExists = yield booking_model_1.Booking.findById(id)
        .populate('user')
        .populate('car');
    if (!isBookingExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This booking id is not exists!');
    }
    const startTime = new Date(`1970-01-01T${isBookingExists.startTime}:00`);
    const endTime = new Date(`1970-01-01T${payload.endTime}:00`);
    if (startTime > endTime) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'End time can not less then start time.');
    }
    const startHours = (0, convertToHours_1.convertToHours)(isBookingExists.startTime);
    const endHours = (0, convertToHours_1.convertToHours)(payload.endTime);
    //calculate total cost
    const pricePerHour = (_a = isBookingExists === null || isBookingExists === void 0 ? void 0 : isBookingExists.car) === null || _a === void 0 ? void 0 : _a.pricePerHour;
    const totalCost = Number(((endHours - startHours) * pricePerHour).toFixed(2));
    const updateCarStatus = yield car_model_1.Car.findByIdAndUpdate(isBookingExists.car._id, {
        status: 'available'
    }, {
        runValidators: true,
        new: true
    });
    const updateBooking = yield booking_model_1.Booking.findByIdAndUpdate(id, {
        endTime: payload === null || payload === void 0 ? void 0 : payload.endTime,
        totalCost
    }, {
        new: true,
        runValidators: true
    });
    if (updateBooking) {
        const result = yield booking_model_1.Booking.findById(updateBooking._id)
            .populate('user')
            .populate('car');
        return result;
    }
});
exports.carServices = {
    getAllCars,
    getSingleCar,
    createCar,
    updateCar,
    deleteCar,
    returnCar
};
