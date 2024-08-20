import merge from "lodash.merge";
import { ICar } from "./car.interface";
import { Car } from "./car.model"


const getAllCars = async () =>{
    const result = await Car.find();
    return result;
}


const getSingleCar = async (id: string) =>{
    const result = await Car.findById(id)
    return result;
}


const createCar = async (payload: ICar) =>{
    const result = await Car.create(payload)
    return result;
}


const updateCar = async (id: string, payload: Partial<ICar>) =>{

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

const deleteCar = async (id: string) =>{
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

export const carServices = {
    getAllCars,
    getSingleCar,
    createCar,
    updateCar,
    deleteCar
}