import merge from "lodash.merge";
import { ICar } from "./car.interface";
import { Car } from "./car.model"
import { Booking } from "../Booking/booking.model";
import { convertToHours } from "../../utility/convertToHours";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Query } from "./car.controller";
import { Types } from "mongoose";


const getAllCars = async (payload: Query) => {

    let unavailableCarIds: Types.ObjectId[] = [];

    if (payload.date) {
        const bookings = await Booking.find({ date: payload.date });
        unavailableCarIds = bookings.map((booking) => booking.car);
    }

    const result = await Car.find({
        _id: { $nin: unavailableCarIds },
    });

    return result;
}


const getSingleCar = async (id: string) => {
    const result = await Car.findById(id)
    return result;
}


const createCar = async (payload: ICar) => {
    const result = await Car.create(payload)
    return result;
}


const updateCar = async (id: string, payload: Partial<ICar>) => {

    const requestedCar = await Car.findById(id)
    const mergedData = merge(requestedCar, payload)
    const result = await Car.findByIdAndUpdate(
        id,
        mergedData,
        {
            new: true,
            runValidators: true
        }
    )
    return result;
}

const deleteCar = async (id: string) => {
    const result = await Car.findByIdAndUpdate(
        id,
        {
            isDeleted: true,
            status: "unavailable"
        },
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

    const bookingDate = new Date(isBookingExists.date);
    const todayDate = new Date();

    // make those date variables 00 time
    bookingDate.setHours(0, 0, 0, 0);
    todayDate.setHours(0, 0, 0, 0); 

    // if (bookingDate > todayDate) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "You can't return the car for an upcoming date.");
    // }

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
            totalCost,
            status: 'UNPAID'
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

export const carServices = {
    getAllCars,
    getSingleCar,
    createCar,
    updateCar,
    deleteCar,
    returnCar
}