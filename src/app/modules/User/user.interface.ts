
// export interface IName {
//     firstName: string;
//     middleName: string;
//     lastName: string;
// }

import { Model } from "mongoose";


export interface IUser {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    phone: string;
    address: string;
    isDeleted: boolean;
}


export interface IUserModel extends Model<IUser>{

    //Method 1
    isUserExists(userEmail: string) : Promise<IUser>

    //Method 2
    isPasswordMatch(plainTextPassword: string, hashPassword: string): Promise<boolean>
}