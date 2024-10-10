import config from "../../config";
import { createToken } from "../Auth/auth.utils";
import { IUser } from "./user.interface"
import { User } from "./user.model"
import merge from 'lodash.merge'



const getUsers = async () => {
    const result = await User.find();
    return result;
}

const getSingleUser = async (id: string) => {
    const result = await User.findById(id);
    return result;
}

const createUser = async (payload: IUser) => {
    const result = await User.create(payload)

    const jwtPayload = {
        userId: result?._id.toString(),
        userEmail: result?.email,
        name: result?.name,
        photo: result?.photo,
        role: result?.role
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
    console.log(jwtPayload, accessToken, refreshToken);

    return {
        userData: result,
        accessToken,
        refreshToken
    };
}

const updateUser = async (id: string, payload: Partial<IUser>) => {

    const currentUser = await User.findById(id)

    const mergedData = merge(currentUser, payload)

    const result = await User.findByIdAndUpdate(
        id,
        mergedData,
        {
            runValidators: true,
            new: true
        }
    )
    return result;
}


const deleteUser = async (id: string) => {
    const result = await User.findByIdAndDelete(id)
    return result
}


export const userServices = {
    getUsers,
    getSingleUser, 
    createUser,
    updateUser,
    deleteUser
}