import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import bcrypt from 'bcrypt'
import { createToken } from "./auth.utils";
import config from "../../config";
import { sendEmail } from "../../utility/sendEmail"; 
import httpStatus from 'http-status';

const signIn = async (payload: {
    email: string;
    password: string;
}) => {

    const currentUser = await User.isUserExists(payload?.email)

    if (!currentUser) {
        throw new AppError(404, 'This user dose not exists!')
    }
    if (currentUser?.isDeleted) {
        throw new AppError(403, 'This user dose not exists!')
    }
    const isPasswordMatch = await User.isPasswordMatch(payload?.password, currentUser?.password)

    if (!isPasswordMatch) {
        throw new AppError(403, 'Password does not match!')
    }

    const jwtPayload = {
        userId: currentUser?._id,
        userEmail: currentUser?.email,
        name: currentUser?.name,
        photo: currentUser?.photo,
        role: currentUser?.role
    }

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expire_time as string
    )

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expire_time as string
    )

    currentUser.password = ''

    return {
        userData: currentUser,
        accessToken,
        refreshToken
    }
}


const refreshToken = async (token: string) => { 
    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    } 
    
    //check if the token is valid 
    const decoded = jwt.verify(
        token,
        config.jwt_refresh_secret as string
    ) as JwtPayload
    
    const { userEmail } = decoded;
    // check if the user exists 
    const currentUser = await User.isUserExists(userEmail)
    if (!currentUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user dose not exists!')
    }
    if (currentUser.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user dose not exists!')
    }


    const jwtPayload = {
        userId: currentUser?._id,
        userEmail: currentUser?.email,
        name: currentUser?.name,
        photo: currentUser?.photo,
        role: currentUser?.role
    }

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expire_time as string
    )

    return {
        accessToken
    }
    

}


const forgetPassword = async (email: string) => {
    const currentUser = await User.findOne({ email })
    if (!currentUser) {
        throw new AppError(404, 'This user dose not exists!')
    }
    if (currentUser?.isDeleted) {
        throw new AppError(403, 'This user dose not exists!')
    }

    const jwtPayload = {
        userId: currentUser?._id,
        userEmail: currentUser?.email,
        name: currentUser?.name,
        photo: currentUser?.photo,
        role: currentUser?.role
    } 

    const resetToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        '10m'
    )
 
    
    const resetLink = `${config.ui_link}/resetPassword?id=${currentUser?._id}&token=${resetToken}`

    sendEmail(currentUser?.email, resetLink); 
    return "Email Sent successfully!"
}


const resetPassword = async (payload: {
    email: string;
    token: string;
    newPassword: string;
}) => {
    const decodedToken = jwt.verify(
        payload.token,
        config.jwt_access_secret as string
    ) as JwtPayload;

    const { userEmail, role, iat } = decodedToken;

    if (userEmail != payload.email) {
        throw new AppError(400, 'You are not authorized!')
    }

    const currentUser = await User.findOne({ email: payload.email })
    if (!currentUser) {
        throw new AppError(404, 'This user dose not exists!')
    }
    if (currentUser?.isDeleted) {
        throw new AppError(403, 'This user dose not exists!')
    }

    const hashNewPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.salt)
    )

    const result = await User.findOneAndUpdate({
        email: userEmail,
        role: role
    },
        {
            password: hashNewPassword
        },
        {
            new: true,
            runValidators: true
        })

    return result;
}



export const authServices = {
    signIn,
    forgetPassword,
    resetPassword,
    refreshToken
}