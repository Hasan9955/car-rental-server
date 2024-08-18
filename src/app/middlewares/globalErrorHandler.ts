import { ErrorRequestHandler } from "express";


const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {

    let statusCode = error.status ? error.status : 500;
    let message = error.message ? error.message : 'Something went wrong!';


    res.status(statusCode).json({
        success: false,
        message,
        error
    })
}

export default globalErrorHandler;