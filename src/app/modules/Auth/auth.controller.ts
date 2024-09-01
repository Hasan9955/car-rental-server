import config from "../../config";
import catchAsync from "../../utility/catchAsync";
import { authServices } from "./auth.service";


const signIn = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await authServices.signIn(payload)
    const { userData, accessToken, refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'User logged in successfully.',
        data: userData,
        token: accessToken
    })
})


export const authControllers = {
    signIn,

}