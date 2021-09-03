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
    name: string;
    dateAdded: string;
}

export interface DataAuth {
    username: string;
    password: string;
}
