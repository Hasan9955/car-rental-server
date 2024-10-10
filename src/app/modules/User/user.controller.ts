import config from "../../config";
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
    const { userData, accessToken, refreshToken } = result;

    //save the refreshToken in the cookie
    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true
    })

    res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        data: userData,
        token: accessToken
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
const deleteUser = catchAsync(async (req, res) =>{
    const userId = req.params.id; 
    const result = await userServices.deleteUser(userId)
    res.status(200).json({
        success: true,
        message: 'User deleted successfully.',
        data: result
    })
})


export const userControllers = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
}