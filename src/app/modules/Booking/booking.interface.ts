import { Types } from "mongoose";

export interface IBooking {
    date: Date;
    user: Types.ObjectId;
    car: Types.ObjectId;
    startTime: string;
    endTime: string;
    totalCost: number;
}