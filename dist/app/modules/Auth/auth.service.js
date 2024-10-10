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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../User/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const sendEmail_1 = require("../../utility/sendEmail");
const http_status_1 = __importDefault(require("http-status"));
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
        userId: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id,
        userEmail: currentUser === null || currentUser === void 0 ? void 0 : currentUser.email,
        name: currentUser === null || currentUser === void 0 ? void 0 : currentUser.name,
        photo: currentUser === null || currentUser === void 0 ? void 0 : currentUser.photo,
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
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    //check if the token is valid 
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { userEmail } = decoded;
    // check if the user exists 
    const currentUser = yield user_model_1.User.isUserExists(userEmail);
    if (!currentUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user dose not exists!');
    }
    if (currentUser.isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user dose not exists!');
    }
    const jwtPayload = {
        userId: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id,
        userEmail: currentUser === null || currentUser === void 0 ? void 0 : currentUser.email,
        name: currentUser === null || currentUser === void 0 ? void 0 : currentUser.name,
        photo: currentUser === null || currentUser === void 0 ? void 0 : currentUser.photo,
        role: currentUser === null || currentUser === void 0 ? void 0 : currentUser.role
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_time);
    return {
        accessToken
    };
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield user_model_1.User.findOne({ email });
    if (!currentUser) {
        throw new AppError_1.default(404, 'This user dose not exists!');
    }
    if (currentUser === null || currentUser === void 0 ? void 0 : currentUser.isDeleted) {
        throw new AppError_1.default(403, 'This user dose not exists!');
    }
    const jwtPayload = {
        userId: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id,
        userEmail: currentUser === null || currentUser === void 0 ? void 0 : currentUser.email,
        name: currentUser === null || currentUser === void 0 ? void 0 : currentUser.name,
        photo: currentUser === null || currentUser === void 0 ? void 0 : currentUser.photo,
        role: currentUser === null || currentUser === void 0 ? void 0 : currentUser.role
    };
    const resetToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, '10m');
    const resetLink = `${config_1.default.ui_link}/resetPassword?id=${currentUser === null || currentUser === void 0 ? void 0 : currentUser._id}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)(currentUser === null || currentUser === void 0 ? void 0 : currentUser.email, resetLink);
    return "Email Sent successfully!";
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = jsonwebtoken_1.default.verify(payload.token, config_1.default.jwt_access_secret);
    const { userEmail, role, iat } = decodedToken;
    if (userEmail != payload.email) {
        throw new AppError_1.default(400, 'You are not authorized!');
    }
    const currentUser = yield user_model_1.User.findOne({ email: payload.email });
    if (!currentUser) {
        throw new AppError_1.default(404, 'This user dose not exists!');
    }
    if (currentUser === null || currentUser === void 0 ? void 0 : currentUser.isDeleted) {
        throw new AppError_1.default(403, 'This user dose not exists!');
    }
    const hashNewPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.salt));
    const result = yield user_model_1.User.findOneAndUpdate({
        email: userEmail,
        role: role
    }, {
        password: hashNewPassword
    }, {
        new: true,
        runValidators: true
    });
    return result;
});
exports.authServices = {
    signIn,
    forgetPassword,
    resetPassword,
    refreshToken
};
