import { AnyZodObject } from "zod";
import catchAsync from "../utility/catchAsync";

const validateRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req, res, next) => {

        await schema.parseAsync({
            body: req.body
        })

        next();

    })
}


export default validateRequest;