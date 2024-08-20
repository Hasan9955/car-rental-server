import catchAsync from "../../utility/catchAsync";
import { userServices } from "./user.service";



const getUsers = catchAsync(async (req, res) => {

    const result = await userServices.getUsers()
    res.status(200).json({
        success: true,
        message: 'Users retrieved successfully.',
        data: result
    })
})


const getSingleUser = catchAsync(async (req, res) =>{
    const userId = req.params.id;
    const result = await userServices.getSingleUser(userId)
    res.status(200).json({
        success: true,
        message: 'User retrieved successfully.',
        data: result
    })
})


const createUser = catchAsync(async (req, res) =>{

    const result = await userServices.createUser(req.body)
    res.status(200).json({
        success: true,
        message: 'User created successfully.',
        data: result
    })
})


const updateUser = catchAsync(async (req, res) =>{
    const userId = req.params.id;
    const payload = req.body;
    const result = await userServices.updateUser(userId, payload)
    res.status(200).json({
        success: true,
        message: 'User updated successfully.',
        data: result
    })
})


export const userControllers = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser
}