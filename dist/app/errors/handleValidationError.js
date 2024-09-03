"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (error) => {
    const errorSources = Object.values(error.errors).map((value) => {
        return {
            path: value === null || value === void 0 ? void 0 : value.path,
            message: value === null || value === void 0 ? void 0 : value.message
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "Validation error.",
        errorSources
    };
};
exports.handleValidationError = handleValidationError;
