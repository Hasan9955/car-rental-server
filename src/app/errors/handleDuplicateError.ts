import { TErrorSources, TGenericErrorResponse } from "../interface/error";


const handleDuplicateError = (error: any): TGenericErrorResponse => {


    const errorSources: TErrorSources = [
        {
            path: `${Object.keys(error?.keyValue)[0]}`,
            message: `${error?.keyValue?.name} is already exists.`
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