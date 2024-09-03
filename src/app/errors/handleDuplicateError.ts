import { TErrorSources, TGenericErrorResponse } from "../interface/error";


const handleDuplicateError = (error: any): TGenericErrorResponse => {

  
    const errorSources: TErrorSources = [
        {
            path: `${Object.keys(error?.keyValue)[0]}`,
            message: `${Object.values(error?.keyValue)[0]} is already exists.`
        }
    ]

    const statusCode = 400
    return {
        statusCode,
        message: 'Duplicate value given!',
        errorSources
    }
}

export default handleDuplicateError;