"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (error) => {
    const errorSources = [
        {
            path: `${Object.keys(error === null || error === void 0 ? void 0 : error.keyValue)[0]}`,
            message: `${Object.values(error === null || error === void 0 ? void 0 : error.keyValue)[0]} is already exists.`
        }
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate value given!',
        errorSources
    };
};
exports.default = handleDuplicateError;
