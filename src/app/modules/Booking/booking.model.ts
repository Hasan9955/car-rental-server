import { model, Schema } from "mongoose";
import { IBooking } from "./booking.interface";


const bookingSchema = new Schema<IBooking>({
    date: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
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
    transactionId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'UNPAID', 'PAID'],
        default: 'PENDING'
    }
},
{
    timestamps: true
})


export const Booking = model<IBooking>('Booking', bookingSchema);

