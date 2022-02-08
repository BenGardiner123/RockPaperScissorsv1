export interface User {
    username: string;
    email: string;
    token?: string;
}

export interface RegisterUserRequestModel {
    username: string;
    email: string;
    password: string;
}

export interface LoginUserRequestModel {
    username: string;
    password: string;
}

export interface RegisterUserResponseModel {
    status: string;
    message: string;
}

export interface LoginUserResponseModel {
    username: string;
    email: string;
    token?: string;
}