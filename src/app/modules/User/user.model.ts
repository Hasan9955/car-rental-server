import { model, Schema } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";


const userSchema = new Schema<IUser, IUserModel>({
    name: {
        type: String,
        required: true
    },
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
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


//Pre save middleware 
//Pre hook will work before saving our data
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.salt)
    )
    next();
})


//Post save middleware 
//Post hook will work after saved our data
userSchema.post('save', async function (doc, next) {
    // console.log(this, 'Post hook we saved our data');
    doc.password = ''
    next();
})


//set statics function 
userSchema.statics.isUserExists = async function (userEmail: string) {
    return await User.findOne({
        email: userEmail
    }).select('+password')
}

userSchema.statics.isPasswordMatch = async function (plainTextPassword: string, hashPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashPassword)
}



export const User = model<IUser, IUserModel>('User', userSchema);