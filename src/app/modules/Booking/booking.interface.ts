import { Types } from "mongoose";

export interface IBooking {
    _id: Types.ObjectId;
    date: string;
    car: Types.ObjectId;
    user: Types.ObjectId; 
    startTime: string;
    endTime: string;
    transactionId: string;
    status: 'PENDING' | 'APPROVED' | 'UNPAID' | 'PAID';
    totalCost: number;
}