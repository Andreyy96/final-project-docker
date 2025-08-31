import { IComment } from "./comment.intarface";
import { IUser } from "./user.interface";

export interface IOrder {
  _id: string;
  id: number;
  name: string;
  surname: string | null;
  email: string | null;
  phone: string | null;
  age: number | null;
  course: string | null;
  course_format: string | null;
  course_type: string | null;
  sum: number | null;
  already_paid: number | null;
  created_at: string | null;
  utm: string | null;
  msg: string | null;
  status: string | null;
  group: string | null;
  manager: string | null;
  manager_info?: IUser[] | null;
  comments?: IComment[] | null;
}

export interface IGeneralInfoOrder {
  _id: string;
  id: number;
  name: string;
  surname: string | null;
  email: string | null;
  phone: string | null;
  age: number | null;
  course: string | null;
  course_format: string | null;
  course_type: string | null;
  sum: number | null;
  already_paid: number | null;
  created_at: string | null;
  utm: string | null;
  msg: string | null;
  status: string | null;
  group: string | null;
  manager: string | null;
}

export interface IOrderResponse {
  _id: string;
  id: number;
  name: string;
  surname: string | null;
  email: string | null;
  phone: string | null;
  age: number | null;
  course: string | null;
  course_format: string | null;
  course_type: string | null;
  sum: number | null;
  already_paid: number | null;
  created_at: string | null;
  utm: string | null;
  msg: string | null;
  status: string | null;
  group: string | null;
  manager: string | null;
  manager_info: Partial<IUser> | null;
  comments: Partial<IComment>[] | null;
}

export interface ISingleOrder {
  _id: string;
  name: string;
  surname: string | null;
  email: string | null;
  phone: string | null;
  age: number | null;
  course: string | null;
  course_format: string | null;
  course_type: string | null;
  sum: number | null;
  already_paid: number | null;
  created_at: string | null;
  utm: string | null;
  msg: string | null;
  status: string | null;
  group: string | null;
  _userId: string | null;
  _commentId: string | null;
}

export interface IDTOOrder {
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: string;
  course_format: string;
  course_type: string;
  sum: number | null;
  already_paid: number;
  status: string;
  group: string;
}

export interface IOrderListResponse {
  data: IOrderResponse[];
  total: number;
  limit: number;
  page: number;
}

export interface IOrderList {
  data: IOrderResponse[];
}
