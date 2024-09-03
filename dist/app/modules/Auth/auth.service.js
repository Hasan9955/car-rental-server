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
exports.authServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../User/user.model");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const signIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield user_model_1.User.isUserExists(payload === null || payload === void 0 ? void 0 : payload.email);
    if (!currentUser) {
        throw new AppError_1.default(404, 'This user dose not exists!');
    }
    if (currentUser === null || currentUser === void 0 ? void 0 : currentUser.isDeleted) {
        throw new AppError_1.default(403, 'This user dose not exists!');
    }
    const isPasswordMatch = yield user_model_1.User.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, currentUser === null || currentUser === void 0 ? void 0 : currentUser.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(403, 'Password does not match!');
    }
    const jwtPayload = {
        userEmail: currentUser === null || currentUser === void 0 ? void 0 : currentUser.email,
        role: currentUser === null || currentUser === void 0 ? void 0 : currentUser.role
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_time);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expire_time);
    currentUser.password = '';
    return {
        userData: currentUser,
        accessToken,
        refreshToken
    };
});
exports.authServices = {
    signIn,
};
