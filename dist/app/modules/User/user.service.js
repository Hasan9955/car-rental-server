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
exports.userServices = void 0;
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("../Auth/auth.utils");
const user_model_1 = require("./user.model");
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    const jwtPayload = {
        userId: result === null || result === void 0 ? void 0 : result._id.toString(),
        userEmail: result === null || result === void 0 ? void 0 : result.email,
        name: result === null || result === void 0 ? void 0 : result.name,
        photo: result === null || result === void 0 ? void 0 : result.photo,
        role: result === null || result === void 0 ? void 0 : result.role
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_time);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expire_time);
    console.log(jwtPayload, accessToken, refreshToken);
    return {
        userData: result,
        accessToken,
        refreshToken
    };
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield user_model_1.User.findById(id);
    const mergedData = (0, lodash_merge_1.default)(currentUser, payload);
    const result = yield user_model_1.User.findByIdAndUpdate(id, mergedData, {
        runValidators: true,
        new: true
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
exports.userServices = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};
