import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";



export const handleValidationError = (error: mongoose.Error.ValidationError) : TGenericErrorResponse =>{
    const errorSources: TErrorSources = Object.values(error.errors).map((value : mongoose.Error.ValidatorError | mongoose.Error.CastError) =>{
        return {
            path: value?.path,
            message: value?.message
        }
    })

    const statusCode = 400;

    return {
      statusCode,
      message: "Validation error.",
      errorSources
    }
}