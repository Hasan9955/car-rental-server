"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (error) => {
    var _a;
    const errorSources = [
        {
            path: `${Object.keys(error === null || error === void 0 ? void 0 : error.keyValue)[0]}`,
            message: `${(_a = error === null || error === void 0 ? void 0 : error.keyValue) === null || _a === void 0 ? void 0 : _a.name} is already exists.`
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
