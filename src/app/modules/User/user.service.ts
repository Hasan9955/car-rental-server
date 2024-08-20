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
    return result;
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


export const userServices = {
    getUsers,
    getSingleUser, 
    createUser,
    updateUser
}