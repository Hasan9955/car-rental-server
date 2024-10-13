"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const validate_request_1 = __importDefault(require("../../middlewares/validate.request"));
const user_controller_1 = require("../User/user.controller");
const user_validation_1 = require("../User/user.validation");
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post('/signup', (0, validate_request_1.default)(user_validation_1.userValidation.createUserValidationSchema), user_controller_1.userControllers.createUser);
router.post('/login', (0, validate_request_1.default)(auth_validation_1.signInValidationSchema), auth_controller_1.authControllers.signIn);
router.post('/refresh-token', auth_controller_1.authControllers.refreshToken);
router.post('/forgetPassword', (0, validate_request_1.default)(auth_validation_1.forgetPasswordValidation), auth_controller_1.authControllers.forgetPassword);
router.post('/resetPassword', (0, validate_request_1.default)(auth_validation_1.resetPasswordValidation), auth_controller_1.authControllers.resetPassword);
exports.authRoutes = router;
