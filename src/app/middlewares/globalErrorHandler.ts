import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import { ZodError } from "zod";
import { handleZodError } from "../errors/handleZodError";
import config from "../config";
import { handleValidationError } from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";


const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {

    let statusCode = error.status ? error.status : 500;
    let message = error.message ? error.message : 'Something went wrong!';
    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong!'
        }
    ]


    // 1. Zod  Error
    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }

    // 2. Validation Error
    else if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }

    // 3. Cast Error
    else if (error?.name === 'CastError') {
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }

    // 4. Duplicate Error
    else if (error?.code === 11000) {
        const simplifiedError = handleDuplicateError(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }

    // 5. App Error
    else if (error instanceof AppError) {
        statusCode = error?.statusCode;
        message = error?.message;
        errorSources = [
            {
                path: '',
                message: error?.message
            }
        ]
    }


    // 6. Error
    else if (error instanceof Error) {
        statusCode = 400
        message = error?.message;
        errorSources = [
            {
                path: '',
                message: error?.message
            }
        ]
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorMessages: errorSources,
        stack: config.node_env === 'development' ? error?.stack : null
    })
}

export default globalErrorHandler;