import { UserRoleEnum } from "../enums/user-role.enum";
import { IGeneralInfoOrder } from "./order.interface";

export interface IUser {
  _id: string;
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  is_active: boolean;
  last_login: Date;
  is_banned: boolean;
}

export interface IResUser {
  user: {
    _id: string;
    id: number;
    name: string;
    surname: string;
    email: string;
    role: UserRoleEnum;
    is_active: boolean;
    last_login: Date;
    is_banned: boolean;
  };
  orders: {
    total: number;
    in_work: number;
    agree: number;
    disagree: number;
    dubbing: number;
  };
}

export interface IUserWithStatistic {
  _id: string;
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  is_active: boolean;
  last_login: Date;
  is_banned: boolean;
  total: IGeneralInfoOrder[];
  in_work: IGeneralInfoOrder[];
  agree: IGeneralInfoOrder[];
  disagree: IGeneralInfoOrder[];
  dubbing: IGeneralInfoOrder[];
}

export interface IDTOUser {
  name: string;
  surname: string;
  email: string;
}

export interface IManagerListResponse {
  data: IResUser[];
  page: number;
  total: number;
  limit: number;
}
