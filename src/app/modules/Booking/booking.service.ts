import merge from "lodash.merge";
import { ICar } from "../Car/car.interface";
import { Car } from "../Car/car.model"
import AppError from "../../errors/AppError";


const getAllBookings = async (query: {
    carId: string;
    date: string;
}) => {
    if (query) {
        const result = await Car.find({
            car: query?.carId,
            date: query?.date
        })
        return result;
    } else {
        const result = await Car.find();
        return result;
    }
}

const getSingleBooking = async (id: string) => {
    const result = await Car.findById(id)
    return result;
}

const createBooking = async (payload: ICar) => {
    const result = await Car.create(payload)
    return result;
}

const updateBooking = async (
    id: string,
    payload: Partial<ICar>
) => {
    const requestedBooking = await Car.findById(id)

    if (!requestedBooking) {
        throw new AppError(404, 'This id is not exists!')
    }

    const mergedData = merge(requestedBooking, payload)
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


const returnCar = async (payload: {
    carId: string;
    endTime: string;
}) => {
    const id = payload.carId;
    const result = await Car.findByIdAndUpdate(
        id,
        {
            endTime: payload?.endTime
        },
        {
            new: true,
            runValidators: true
        }
    )
    
    return result;
}


export const bookingServices = {
    getAllBookings,
    getSingleBooking,
    createBooking,
    updateBooking,
    returnCar
}