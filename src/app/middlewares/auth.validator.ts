import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from "../errors/AppError"
import catchAsync from "../utility/catchAsync"
import httpStatus from "http-status";
import config from '../config';
import { User } from '../modules/User/user.model';

type TRole = 'user' | 'admin'
const authValidator = (...requiredRole: TRole[]) => {
    return catchAsync(async (req, res, next) => {

        const token = req.headers.authorization?.split(' ')?.[1]

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
        }

        const decodedToken = jwt.verify(
            token,
            config.jwt_access_secret as string
        ) as JwtPayload;


        req.user = decodedToken; 
        const { userEmail, role, iat } = decodedToken;
        const currentUser = await User.isUserExists(userEmail)

        if (!currentUser) {
            throw new AppError(404, 'This user dose not exists!')
        }
        if (currentUser?.isDeleted) {
            throw new AppError(403, 'This user dose not exists!')
        }
        if (requiredRole && !requiredRole.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
        }

        next();

    })
}


export default authValidator;