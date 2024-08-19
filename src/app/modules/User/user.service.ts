import { IUser } from "./user.interface"
import { User } from "./user.model"




const getUsers = async () => {

}

const getSingleUser = async () => {

}

const createUser = async (payload: IUser) => {
    const result = await User.create(payload)
    return result;
}

const updateUser = async () => {

}


export const userServices = {
    getUsers,
    getSingleUser, 
    createUser,
    updateUser
}