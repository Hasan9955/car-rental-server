import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import bcrypt from 'bcrypt'
import { createToken } from "./auth.utils";
import config from "../../config";


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
        userEmail: currentUser?.email,
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



export const authServices = {
    signIn,

}