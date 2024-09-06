import catchAsync from "../../utility/catchAsync";
import { carServices } from "./car.service";


const getAllCars = catchAsync(async (req, res) =>{
    const result = await carServices.getAllCars()
    res.status(200).json({
        success: true,
        message: 'All Cars retrieved successfully.',
        data: result
    })
})

const getSingleCar = catchAsync(async (req, res) =>{
    const id = req.params.id;
    const result = await carServices.getSingleCar(id)
    res.status(200).json({
        success: true,
        message: 'Car retrieved successfully.',
        data: result
    })
})

const createCar = catchAsync(async (req, res) =>{
    const payload = req.body;
    const result = await carServices.createCar(payload)
    res.status(201).json({
        success: true,
        message: 'Car created successfully.',
        data: result
    })
})

const updateCar = catchAsync(async (req, res) =>{
    console.log('Hi here i am');
    const id = req.params.id;
    const payload = req.body;
    const result = await carServices.updateCar(id, payload)
    res.status(200).json({
        success: true,
        message: 'Car updated successfully.',
        data: result
    })
})

const deleteCar = catchAsync(async (req, res) =>{
    const id = req.params.id;
    const result = await carServices.deleteCar(id)
    res.status(200).json({
        success: true,
        message: 'Car is deleted successfully.',
        data: result
    })
})

const returnCar = catchAsync(async (req, res) => {
    console.log("returned car");
    const payload = req.body
    const result = await carServices.returnCar(payload)
    res.status(200).json({
        success: true,
        message: 'Car returned successfully.',
        data: result
    })
})


export const carControllers = {
    getAllCars,
    getSingleCar,
    createCar,
    updateCar,
    deleteCar,
    returnCar
}