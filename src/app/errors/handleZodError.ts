import { ZodError, ZodIssue } from "zod";
import { TGenericErrorResponse } from "../interface/error";



export const handleZodError = (error: ZodError) : TGenericErrorResponse => {
    const errorSources = error.issues.map((issue: ZodIssue) => {
        return {
          path: issue.path[issue.path.length - 1],
          message: issue.message
        }
      })
  
      const statusCode = 400;
      return {
        statusCode,
        message: "Validation error.",
        errorSources
      }
}