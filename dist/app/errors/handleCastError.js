"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errorSources = [
        {
            path: error.path,
            message: error.message
        }
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid Error',
        errorSources
    };
};
exports.default = handleCastError;
