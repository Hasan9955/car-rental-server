
// export interface IName {
//     firstName: string;
//     middleName: string;
//     lastName: string;
// }

import { Model, ObjectId } from "mongoose";


export interface IUser {
    _id: ObjectId,
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    phone: string;
    photo: string;
    address: string;
    isDeleted: boolean;
}


export interface IUserModel extends Model<IUser>{

    //Method 1
    isUserExists(userEmail: string) : Promise<IUser>

    //Method 2
    isPasswordMatch(plainTextPassword: string, hashPassword: string): Promise<boolean>
}