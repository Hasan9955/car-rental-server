import catchAsync from "../../utility/catchAsync";
import { bookingServices } from "./booking.service";



const getAllBookings = catchAsync(async (req, res) =>{
    const result = await bookingServices.getAllBookings()
    res.status(200).json({
        success: true,
        message: 'All booking retrieved successfully.',
        data: result
    })
})


const getSingleBooking = catchAsync(async (req, res) =>{
    const result = await bookingServices.getSingleBooking()
    res.status(200).json({
        success: true,
        message: 'All booking retrieved successfully.',
        data: result
    })
})


const createBooking = catchAsync(async (req, res) =>{
    const result = await bookingServices.createBooking()
    res.status(200).json({
        success: true,
        message: 'All booking retrieved successfully.',
        data: result
    })
})


const updateBooking = catchAsync(async (req, res) =>{
    const result = await bookingServices.updateBooking()
    res.status(200).json({
        success: true,
        message: 'All booking retrieved successfully.',
        data: result
    })
})

const returnCar = catchAsync(async (req, res) =>{
    const result = await bookingServices.returnCar()
    res.status(200).json({
        success: true,
        message: 'All booking retrieved successfully.',
        data: result
    })
})



export const bookingControllers = {
    getAllBookings,
    getSingleBooking,
    createBooking,
    updateBooking,
    returnCar
}