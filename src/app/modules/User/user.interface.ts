
export interface IName {
    firstName: string;
    middleName: string;
    lastName: string;
}


export interface IUser {
    name: IName;
    email: string;
    password: string;
    role: 'admin' | 'user';
    contactNo: string;
    address: string;
}