import {UserRoleEnum} from "../enums/user-role.enum";
import {ITokenPair} from "./token.interface";

export interface IUser {
    _id: string;
    id: number;
    name: string;
    surname: string;
    email: string;
    role: UserRoleEnum;
    is_active: boolean;
    last_login: Date;
    is_banned: boolean;
}

export interface IAuthUser {
    user: IUser;
    tokens: ITokenPair;
}

export interface ICreateManager {
    email: string;
    name: string;
    surname: string;
}


export interface IManagerInfo {
	_id: string;
	id: number;
	name: string;
	surname: string;
	email: string;
	is_active: boolean;
	last_login: string;
	is_banned: boolean;
	role: string;
}

export interface IManagerWithStatistic {
    user: {
        _id: string;
        id: number;
        name: string;
        surname: string;
        email: string;
        role: string;
        is_active: boolean;
        last_login: string;
        is_banned: boolean;
    }
    orders: {
        total: number;
        in_work: number;
        agree: number;
        disagree: number;
        dubbing: number;
    }
}

export interface IManagerRes {
    data: IManagerWithStatistic[];
    page: number;
    total: number;
    limit: number;
}