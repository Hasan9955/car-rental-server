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
exports.carServices = {
    getAllCars,
    getSingleCar,
    createCar,
    updateCar,
    deleteCar
};
