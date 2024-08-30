import catchAsync from "../../utility/catchAsync";
import { bookingServices } from "./booking.service";



const getAllBookings = catchAsync(async (req, res) => {
    const query = req.query;
    console.log(query);
    const result = await bookingServices.getAllBookings(query as {
        carId: string;
        date: string;
    })
    res.status(200).json({
        success: true,
        message: 'All bookings retrieved successfully.',
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


const createBooking = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await bookingServices.createBooking(payload)
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

const returnCar = catchAsync(async (req, res) => {
    const payload = req.body
    const result = await bookingServices.returnCar(payload)
    res.status(200).json({
        success: true,
        message: 'Car returned successfully.',
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