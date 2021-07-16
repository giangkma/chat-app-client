export type AuthToken = string;

export interface UserToken {
    authToken: string;
}

export interface ResponseAuth {
    accessToken: string;
    information: User;
}

export interface User {
    _id: string;
    username: string;
    idOnline: boolean;
    avatar?: string;
    dateAdded: string;
}

export interface DataLogin {
    username: string;
    password: string;
}

export interface DataRegister extends DataLogin {
    name: string;
}

export interface UpdateProfile {
    name: string;
    avatar?: string;
}

export interface ChangePassword {
    password: string;
    newPassword: string;
    reNewPassword: string;
}
