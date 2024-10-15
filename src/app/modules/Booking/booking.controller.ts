import catchAsync from "../../utility/catchAsync"; 
import { bookingServices } from "./booking.service";



const getAllBookings = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await bookingServices.getAllBookings(query as {
        carId: string;
        date: string;
    })
    res.status(200).json({
        success: true,
        message: 'Bookings retrieved successfully.',
        data: result
    })
})

const getUserBookings = catchAsync(async (req, res) => {
    const { userId } = req.user;
    const result = await bookingServices.getUserBookings(userId);
    res.status(200).json({
        success: true,
        message: 'My Bookings retrieved successfully.',
        data: result
    })
})


const getSingleBooking = catchAsync(async (req, res) => {
    const result = await bookingServices.getSingleBooking(req.params.id)
    res.status(200).json({
        success: true,
        message: 'My Bookings retrieved successfully.',
        data: result
    })
})

const deleteBooking = catchAsync(async (req, res) => {
    const result = await bookingServices.deleteBooking(req.params.id)
    res.status(200).json({
        success: true,
        message: 'Booking deleted successfully.',
        data: result
    })
})


const createBooking = catchAsync(async (req, res) => {
    const { userId } = req.user;
    const payload = req.body;

    const result = await bookingServices.createBooking(payload, userId)
    res.status(200).json({
        success: true,
        message: 'Car booked successfully.',
        data: result
    })
})


const updateBooking = catchAsync(async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await bookingServices.updateBooking(id, payload)
    res.status(200).json({
        success: true,
        message: 'Booking updated successfully.',
        data: result
    })
})




export const bookingControllers = {
    getAllBookings,
    getUserBookings,
    getSingleBooking,
    createBooking,
    updateBooking,
    deleteBooking
}