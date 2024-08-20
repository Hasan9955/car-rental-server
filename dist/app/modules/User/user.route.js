"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validate_request_1 = __importDefault(require("../../middlewares/validate.request"));
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.get('/', user_controller_1.userControllers.getUsers);
router.get('/:id', user_controller_1.userControllers.getSingleUser);
router.post('/create-user', (0, validate_request_1.default)(user_validation_1.userValidation.createUserValidationSchema), user_controller_1.userControllers.createUser);
router.patch('/update-user/:id', (0, validate_request_1.default)(user_validation_1.userValidation.updateUserValidationSchema), user_controller_1.userControllers.updateUser);
exports.userRoutes = router;
