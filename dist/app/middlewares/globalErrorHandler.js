"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = error.status ? error.status : 500;
    let message = error.message ? error.message : 'Something went wrong!';
    res.status(statusCode).json({
        success: false,
        message,
        error
    });
};
exports.default = globalErrorHandler;
