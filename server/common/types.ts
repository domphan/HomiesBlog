import { Request } from 'express';

export interface UserRequestInterface extends Request {
    id: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    username: string;
    email: string;
    password: string;
}

export interface UserInterface {
    id: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    username: string;
    email: string;
    password: string;
}

export interface PostInterface {
    title: string;
    textContent: string;
    mediaUrl: string
}

export interface PostPatchInterface {
    op: string,
    path: string,
    value: string
}

export interface UploadRequest extends Request {
    file: any
}