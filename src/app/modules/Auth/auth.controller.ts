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


const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await authServices.refreshToken(refreshToken)
    res.status(200).json({
        success: true,
        message: 'Token retrieved Successfully.',
        data: result
    })
})


const forgetPassword = catchAsync(async (req, res) => {
    const result = await authServices.forgetPassword(req.body.email)
    res.status(200).json({
        success: true,
        message: 'Token retrieved successfully.',
        data: result
    })
})
const resetPassword = catchAsync(async (req, res) => {
    const result = await authServices.resetPassword(req.body)
    res.status(200).json({
        success: true,
        message: 'Password reset successfully.',
        data: result
    })
})


export const authControllers = {
    signIn,
    forgetPassword,
    resetPassword
}