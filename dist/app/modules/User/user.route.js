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
const auth_validator_1 = __importDefault(require("../../middlewares/auth.validator"));
const router = (0, express_1.Router)();
router.get('/', (0, auth_validator_1.default)('admin'), user_controller_1.userControllers.getUsers);
router.get('/:id', user_controller_1.userControllers.getSingleUser);
router.post('/create-user', (0, validate_request_1.default)(user_validation_1.userValidation.createUserValidationSchema), user_controller_1.userControllers.createUser);
router.put('/:id', (0, validate_request_1.default)(user_validation_1.userValidation.updateUserValidationSchema), user_controller_1.userControllers.updateUser);
router.delete('/:id', user_controller_1.userControllers.deleteUser);
exports.userRoutes = router;
