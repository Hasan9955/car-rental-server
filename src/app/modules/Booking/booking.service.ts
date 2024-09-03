import merge from "lodash.merge";
import { ICar } from "../Car/car.interface";
import { Car } from "../Car/car.model"
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Booking } from "./booking.model";
import { IBooking } from "./booking.interface";
import { convertToHours } from "../../utility/convertToHours";


const getAllBookings = async (query: {
    carId: string;
    date: string;
}) => {

    const { carId, date } = query;
    if (carId && date) {
        const result = await Booking.find({
            car: carId,
            date: date
        })
            .populate('user')
            .populate('car')
        return result ? result : 'No booking matched with this query.';
    }
    if (carId) {
        const result = await Booking.find({
            car: carId
        })
            .populate('user')
            .populate('car')
        return result ? result : 'No booking matched with this Car ID.';
    }
    if (date) {
        const result = await Booking.find({
            date
        })
            .populate('user')
            .populate('car')
        return result ? result : 'No booking matched with this Date.';
    }


    const result = await Booking.find()
        .populate('user')
        .populate('car');
    return result;
}

const getUserBookings = async (userId: string) => {
    const result = await Booking.find({
        user: userId
    })
        .populate('user')
        .populate('car')
    return result;

}

const getSingleBooking = async (id: string) => {
    const result = await Booking.findById(id)
        .populate('user')
        .populate('car')
    return result;
}

const createBooking = async (payload: IBooking, userId: string) => {
    const bookingData = {
        car: payload.carId,
        startTime: payload.startTime,
        date: payload.date,
        user: userId,
    }



    const inputDate = new Date(bookingData.date);

    const today = new Date();

    // Set time to the start of the day for accurate comparison
    today.setHours(0, 0, 0, 0);

    // Calculate one year from today
    const oneYearFromToday = new Date(today);
    oneYearFromToday.setFullYear(today.getFullYear() + 1);

    // Validate the date is not in the past and not more than one year from today
    if (inputDate < today) {
        throw new AppError(httpStatus.BAD_REQUEST, 'You can not set date in the past!')
    }
    if (inputDate > oneYearFromToday) {
        throw new AppError(httpStatus.BAD_REQUEST, 'You can not set date bigger then 1 year!')
    }


    const updateCarStatus = await Car.findByIdAndUpdate(
        bookingData.car,
        {
            status: 'unavailable'
        },
        {
            runValidators: true,
            new: true
        }
    )
    if (!updateCarStatus) {
        throw new AppError(404, 'Car not found!')
    }
    const result = await Booking.create(bookingData)
    if (result) {
        const createdBooking = await Booking.findById(result._id)
            .populate('user')
            .populate('car')

        return createdBooking;
    }
    return result;
}

const updateBooking = async (
    id: string,
    payload: Partial<IBooking>
) => {
    const requestedBooking = await Booking.findById(id)

    if (!requestedBooking) {
        throw new AppError(404, 'This id is not exists!')
    }

    const mergedData = merge(requestedBooking, payload)
    const result = await Booking.findByIdAndUpdate(
        id,
        mergedData,
        {
            new: true,
            runValidators: true
        }
    )
    return result;
}


const returnCar = async (payload: {
    bookingId: string;
    endTime: string;
}) => {
    const id = payload.bookingId;

    const isBookingExists = await Booking.findById(id)
        .populate('user')
        .populate('car')

    if (!isBookingExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This booking id is not exists!')
    }

    const startTime = new Date(`1970-01-01T${isBookingExists.startTime}:00`)

    const endTime = new Date(`1970-01-01T${payload.endTime}:00`)

    if (startTime > endTime) {
        throw new AppError(httpStatus.BAD_REQUEST, 'End time can not less then start time.')
    }

    const startHours = convertToHours(isBookingExists.startTime)
    const endHours = convertToHours(payload.endTime)

    //calculate total cost
    const pricePerHour = (isBookingExists?.car as any)?.pricePerHour
    const totalCost = Number(((endHours - startHours) * pricePerHour).toFixed(2))

    const updateCarStatus = await Car.findByIdAndUpdate(
        isBookingExists.car._id,
        {
            status: 'available'
        },
        {
            runValidators: true,
            new: true
        }
    )

    const updateBooking = await Booking.findByIdAndUpdate(
        id,
        {
            endTime: payload?.endTime,
            totalCost
        },
        {
            new: true,
            runValidators: true
        }
    )
    if (updateBooking) {
        const result = await Booking.findById(updateBooking._id)
            .populate('user')
            .populate('car')

        return result;
    }

}


export const bookingServices = {
    getAllBookings,
    getUserBookings,
    getSingleBooking,
    createBooking,
    updateBooking,
    returnCar
}