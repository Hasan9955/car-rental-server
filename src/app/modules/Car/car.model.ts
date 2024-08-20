import { model, Schema } from "mongoose";
import { ICar } from "./car.interface";
import { boolean } from "zod";


const carSchema = new Schema<ICar>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    isElectric: {
        type: Boolean,
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: "available"
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

// if car is deleted we will not send it to client
carSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next();
})

carSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next();
})


export const Car = model<ICar>('Car', carSchema)