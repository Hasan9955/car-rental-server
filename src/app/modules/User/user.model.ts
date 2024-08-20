import { model, Schema } from "mongoose";
import { IName, IUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

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
        required: true,
        select: 0
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


//Pre save middleware 
//Pre hook will work before saving our data
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await  bcrypt.hash(
        user.password,
        Number(config.salt)
    )
    next();
})


//Post save middleware 
//Post hook will work after saved our data
userSchema.post('save', async function(doc, next){
    // console.log(this, 'Post hook we saved our data');
    doc.password = ''
    next();
})

export const User = model<IUser>('User', userSchema);