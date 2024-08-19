import { model, Schema } from "mongoose";
import { IName, IUser } from "./user.interface";


const nameSchema = new Schema<IName> ({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
}, {
    _id: false
})

const userSchema = new Schema<IUser>({
    name: nameSchema,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
},{
    timestamps: true
})


export const User = model<IUser>('User', userSchema);