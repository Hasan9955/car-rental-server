import { Schema } from "mongoose";
import { IBooking } from "./booking.interface";


const bookingSchema = new Schema<IBooking>({
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    car: {
        type: Schema.Types.ObjectId,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        default: null
    },
    totalCost: {
        type: Number,
        default: 0
    },
})