import dayjs from "dayjs";

import {
  IGeneralInfoOrder,
  IOrder,
  IOrderListResponse,
  IOrderResponse,
} from "../interfaces/order.interface";
import { IQuery } from "../interfaces/query.interface";
import { commentPresenter } from "./comment.presenter";
import { userPresenter } from "./user.presenter";

class OrderPresenter {
  toPublicResDto(entity: IOrder): IOrderResponse {
    return {
      _id: entity._id,
      id: entity.id,
      name: entity.name ? entity.name : null,
      surname: entity.surname ? entity.surname : null,
      email: entity.email ? entity.email : null,
      phone: entity.phone ? entity.phone : null,
      age: entity.age ? entity.age : null,
      course: entity.course ? entity.course : null,
      course_format: entity.course_format ? entity.course_format : null,
      course_type: entity.course_type ? entity.course_type : null,
      sum: entity.sum ? entity.sum : null,
      already_paid: entity.already_paid ? entity.already_paid : null,
      group: entity.group ? entity.group : null,
      status: entity.status ? entity.status : null,
      msg: entity.msg ? entity.msg : null,
      utm: entity.utm ? entity.utm : null,
      created_at: dayjs(entity.created_at).format("MMMM D, YYYY"),
      manager: entity.manager ? entity.manager : null,
      manager_info:
        entity.manager_info.length <= 0
          ? null
          : userPresenter.toPublicResDto(entity.manager_info[0]),
      comments:
        entity.comments.length <= 0
          ? null
          : entity.comments.map((comment) =>
              commentPresenter.toPublicResDto(comment),
            ),
    };
  }

  toPublicForExcelResDto(entity: IOrder): IGeneralInfoOrder {
    return {
      _id: entity._id,
      id: entity.id,
      name: entity.name ? entity.name : null,
      surname: entity.surname ? entity.surname : null,
      email: entity.email ? entity.email : null,
      phone: entity.phone ? entity.phone : null,
      age: entity.age ? entity.age : null,
      course: entity.course ? entity.course : null,
      course_format: entity.course_format ? entity.course_format : null,
      course_type: entity.course_type ? entity.course_type : null,
      sum: entity.sum ? entity.sum : null,
      already_paid: entity.already_paid ? entity.already_paid : null,
      group: entity.group ? entity.group : null,
      status: entity.status ? entity.status : null,
      msg: entity.msg ? entity.msg : null,
      utm: entity.utm ? entity.utm : null,
      created_at: dayjs(entity.created_at).format("MMMM D, YYYY"),
      manager: entity.manager ? entity.manager : null,
    };
  }

  public toListResDto(
    entities: IOrder[],
    total: number,
    limit: number,
    query: IQuery,
  ): IOrderListResponse {
    return {
      data: entities.map(this.toPublicResDto),
      page: query.page ? +query.page : 1,
      total,
      limit,
    };
  }

  // public toListForExcelResDto(entities: IOrder[]): IOrderList {
  //   return {
  //     data: entities.map(this.toPublicResDto),
  //   };
  // }

  public toListForExcelResDto(entities: IOrder[]): {
    data: IGeneralInfoOrder[];
  } {
    return {
      data: entities.map(this.toPublicForExcelResDto),
    };
  }
}

export const orderPresenter = new OrderPresenter();
