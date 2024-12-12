import merge from "lodash.merge";
import { Car } from "../Car/car.model"
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Booking } from "./booking.model";
import { IBooking } from "./booking.interface";
import config from "../../config";
const stripe = require('stripe')(config.strip_key)

const getAllBookings = async (query: {
    carId: string;
    date: string;
    status: string;
}) => {

    const { carId, date, status } = query; 
    let statusArray = null;
    if (status) {
        statusArray = status.split('-')
    }
    
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


    const result = await Booking.find({
        status: { $nin: statusArray }
    }).sort({
        createdAt: -1
    })
        .populate('user')
        .populate('car');
    return result;
}

const getUserBookings = async (userId: string, query: any) => {

    const queryValue = query.query;
    let queryArray = null;
    if (queryValue) {
        queryArray = queryValue.split('-');
    }

    const result = await Booking.find({
        user: userId,
        status: { $nin: queryArray }
    }).sort({
        createdAt: -1
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
        car: payload.car,
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

    const isBookingAlreadyExists = await Booking.findOne({ car: payload.car, date: payload.date })

    if (isBookingAlreadyExists) {
        throw new AppError(httpStatus.BAD_REQUEST, 'This car is already booked for requested day!')
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


const deleteBooking = async (id: string) => {
    const result = await Booking.findByIdAndDelete(id)
    return result;
}


const createPaymentIntent = async (price: number) => {
 
    const amount = parseInt((price * 100).toString());
  

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ['card']
      });

    return {
        clientSecret: paymentIntent.client_secret
    }
    
}





export const bookingServices = {
    getAllBookings,
    getUserBookings,
    getSingleBooking,
    createBooking,
    updateBooking,
    deleteBooking,
    createPaymentIntent
}