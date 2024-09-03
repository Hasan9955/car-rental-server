import { Types } from "mongoose";

export interface IBooking {
    _id: Types.ObjectId;
    date: string;
    carId?: Types.ObjectId;
    user: Types.ObjectId;
    car: Types.ObjectId;
    startTime: string;
    endTime: string;
    totalCost: number;
}