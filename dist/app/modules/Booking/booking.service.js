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
const getAllBookings = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (query) {
        const result = yield car_model_1.Car.find({
            car: query === null || query === void 0 ? void 0 : query.carId,
            date: query === null || query === void 0 ? void 0 : query.date
        });
        return result;
    }
    else {
        const result = yield car_model_1.Car.find();
        return result;
    }
});
const getSingleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findById(id);
    return result;
});
const createBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.create(payload);
    return result;
});
const updateBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const requestedBooking = yield car_model_1.Car.findById(id);
    if (!requestedBooking) {
        throw new AppError_1.default(404, 'This id is not exists!');
    }
    const mergedData = (0, lodash_merge_1.default)(requestedBooking, payload);
    const result = yield car_model_1.Car.findByIdAndUpdate(id, mergedData, {
        new: true,
        runValidators: true
    });
    return result;
});
const returnCar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = payload.carId;
    const result = yield car_model_1.Car.findByIdAndUpdate(id, {
        endTime: payload === null || payload === void 0 ? void 0 : payload.endTime
    }, {
        new: true,
        runValidators: true
    });
    return result;
});
exports.bookingServices = {
    getAllBookings,
    getSingleBooking,
    createBooking,
    updateBooking,
    returnCar
};
