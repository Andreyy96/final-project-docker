import { FilterQuery } from "mongoose";

import { ListOrderByEnum } from "../enums/orderBy.enum";
import { StatusEnum } from "../enums/status.enum";
import {
  IDTOOrder,
  IGeneralInfoOrder,
  IOrder,
  ISingleOrder,
} from "../interfaces/order.interface";
import { IQuery } from "../interfaces/query.interface";
import { IUser } from "../interfaces/user.interface";
import { Order } from "../models/order.model";

class OrderRepository {
  public async getListNoAggregation(
    query: IQuery,
  ): Promise<[IOrder[], number, number]> {
    const page = query.page ? query.page : 1;
    const filterObj = this.getFilterObj(query);

    const skip = 25 * (+page - 1);
    return await Promise.all([
      Order.find(filterObj).limit(25).skip(skip).sort({ id: -1 }),
      Order.countDocuments(filterObj),
      25,
    ]);
  }

  public async getSortListNoAggregation(
    query: IQuery,
  ): Promise<[IOrder[], number, number]> {
    const page = query.page ? query.page : 1;
    const sortObj = this.getSortObj(query.order);
    const filterObj = this.getFilterObj(query);

    const skip = 25 * (+page - 1);
    return await Promise.all([
      Order.find(filterObj).limit(25).skip(skip).sort(sortObj),
      Order.countDocuments(filterObj),
      25,
    ]);
  }

  public async getCommentsAndManagerInfo(order: IOrder): Promise<IOrder[]> {
    return await Order.aggregate([
      {
        $match: { _id: order._id },
      },
      {
        $lookup: {
          from: "users",
          let: { userId: "$_userId" },
          as: "manager_info",
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userId"] } } }],
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { id: "$_id" },
          as: "comments",
          pipeline: [
            { $match: { $expr: { $eq: ["$_orderId", "$$id"] } } },
            { $sort: { createdAt: -1 } },
            { $limit: 3 },
          ],
        },
      },
    ]);
  }

  public async getList(query: IQuery): Promise<[IOrder[], number, number]> {
    const page = query.page ? query.page : 1;

    const skip = 25 * (+page - 1);

    return await Promise.all([
      Order.aggregate([
        {
          $lookup: {
            from: "users",
            let: { userId: "$_userId" },
            as: "manager_info",
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userId"] } } }],
          },
        },
        {
          $lookup: {
            from: "comments",
            let: { id: "$_id" },
            as: "comments",
            pipeline: [
              { $match: { $expr: { $eq: ["$_orderId", "$$id"] } } },
              { $sort: { createdAt: -1 } },
              { $limit: 3 },
            ],
          },
        },
        { $sort: { id: -1 } },
        { $skip: skip },
      ]).limit(25),
      Order.countDocuments(),
      25,
    ]);
  }

  public async getListByOrder(
    query: IQuery,
  ): Promise<[IOrder[], number, number]> {
    const sortObj = this.getSortObj(query.order);
    const page = query.page ? query.page : 1;

    const skip = 25 * (+page - 1);

    return await Promise.all([
      Order.aggregate([
        {
          $lookup: {
            from: "users",
            let: { userId: "$_userId" },
            as: "manager_info",
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userId"] } } }],
          },
        },
        {
          $lookup: {
            from: "comments",
            let: { id: "$_id" },
            as: "comments",
            pipeline: [
              { $match: { $expr: { $eq: ["$_orderId", "$$id"] } } },
              { $sort: { createdAt: -1 } },
              { $limit: 3 },
            ],
          },
        },
        { $sort: sortObj },
        { $skip: skip },
      ]).limit(25),
      Order.countDocuments(),
      25,
    ]);
  }

  public async getById(id: string): Promise<ISingleOrder> {
    return await Order.findById({ _id: id });
  }

  public async updateStatusAndManagerById(
    id: string,
    userId: string,
    name: string,
  ): Promise<void> {
    await Order.findByIdAndUpdate(id, {
      manager: name,
      status: "In work",
      _userId: userId,
    });
  }

  public async updateById(
    dto: IDTOOrder,
    order: ISingleOrder,
    user: IUser,
  ): Promise<ISingleOrder> {
    if (dto.status === StatusEnum.NEW) {
      return await Order.findByIdAndUpdate(
        order._id,
        {
          ...dto,
          status: dto.status ? dto.status : null,
          manager: null,
          _userId: null,
        },
        { new: true },
      );
    } else {
      return await Order.findByIdAndUpdate(
        order._id,
        {
          ...dto,
          status: dto.status ? dto.status : null,
          manager: user.name,
          _userId: user._id,
        },
        { new: true },
      );
    }
  }

  public async getStatusStatisticList(): Promise<
    [number, number, number, number, number, number, number]
  > {
    return await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: StatusEnum.AGREE }),
      Order.countDocuments({ status: StatusEnum.IN_WORK }),
      Order.countDocuments({ status: StatusEnum.DISAGREE }),
      Order.countDocuments({ status: StatusEnum.DUBBING }),
      Order.countDocuments({ status: StatusEnum.NEW }),
      Order.countDocuments({ status: null }),
    ]);
  }

  public async getListForExcel(): Promise<IGeneralInfoOrder[]> {
    return await Order.find({}).sort({ id: -1 });
  }

  public async getListForExcelByOrder(
    query: IQuery,
  ): Promise<[IOrder[], number, number]> {
    const sortObj = this.getSortObj(query.order);

    return await Promise.all([
      Order.aggregate([
        {
          $lookup: {
            from: "users",
            let: { userId: "$_userId" },
            as: "manager_info",
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userId"] } } }],
          },
        },
        {
          $lookup: {
            from: "comments",
            let: { id: "$_id" },
            as: "comments",
            pipeline: [
              { $match: { $expr: { $eq: ["$_orderId", "$$id"] } } },
              { $sort: { createdAt: -1 } },
            ],
          },
        },
        { $sort: sortObj },
      ]),
      Order.countDocuments(),
      25,
    ]);
  }

  public async getSortListForExcel(
    query: IQuery,
  ): Promise<[IOrder[], number, number]> {
    const sortObj = this.getSortObj(query.order);
    const filterObj = this.getFilterObj(query);

    return await Promise.all([
      Order.find(filterObj).sort(sortObj),
      Order.countDocuments(filterObj),
      25,
    ]);
  }

  public async getFilterListForExcel(
    query: IQuery,
  ): Promise<IGeneralInfoOrder[]> {
    const filterObj = this.getFilterObj(query);

    return await Order.find(filterObj).sort({ id: -1 });
  }

  private getSortObj(order: string): Record<string, 1 | -1> {
    let sortObj: Record<string, 1 | -1>;

    switch (order) {
      case ListOrderByEnum.ID:
        sortObj = { id: 1 };
        break;
      case ListOrderByEnum._ID:
        sortObj = { id: -1 };
        break;
      case ListOrderByEnum.NAME:
        sortObj = { name: 1, id: 1 };
        break;
      case ListOrderByEnum._NAME:
        sortObj = { name: -1, id: 1 };
        break;
      case ListOrderByEnum.SURNAME:
        sortObj = { surname: 1, id: 1 };
        break;
      case ListOrderByEnum._SURNAME:
        sortObj = { surname: -1, id: 1 };
        break;
      case ListOrderByEnum.EMAIL:
        sortObj = { email: 1, id: 1 };
        break;
      case ListOrderByEnum._EMAIL:
        sortObj = { email: -1, id: 1 };
        break;
      case ListOrderByEnum.PHONE:
        sortObj = { phone: 1, id: 1 };
        break;
      case ListOrderByEnum._PHONE:
        sortObj = { phone: -1, id: 1 };
        break;
      case ListOrderByEnum.AGE:
        sortObj = { age: 1, id: 1 };
        break;
      case ListOrderByEnum._AGE:
        sortObj = { age: -1, id: 1 };
        break;
      case ListOrderByEnum.COURSE:
        sortObj = { course: 1, id: 1 };
        break;
      case ListOrderByEnum._COURSE:
        sortObj = { course: -1, id: 1 };
        break;
      case ListOrderByEnum.COURSE_FORMAT:
        sortObj = { course_format: 1, id: 1 };
        break;
      case ListOrderByEnum._COURSE_FORMAT:
        sortObj = { course_format: -1, id: 1 };
        break;
      case ListOrderByEnum.COURSE_TYPE:
        sortObj = { course_type: 1, id: 1 };
        break;
      case ListOrderByEnum._COURSE_TYPE:
        sortObj = { course_type: -1, id: 1 };
        break;
      case ListOrderByEnum.SUM:
        sortObj = { sum: 1, id: 1 };
        break;
      case ListOrderByEnum._SUM:
        sortObj = { sum: -1, id: 1 };
        break;
      case ListOrderByEnum.ALREADY_PAID:
        sortObj = { already_paid: 1, id: 1 };
        break;
      case ListOrderByEnum._ALREADY_PAID:
        sortObj = { already_paid: -1, id: 1 };
        break;
      case ListOrderByEnum.CREATED_AT:
        sortObj = { created_at: 1, id: 1 };
        break;
      case ListOrderByEnum._CREATED_AT:
        sortObj = { created_at: -1, id: 1 };
        break;
      case ListOrderByEnum.GROUP:
        sortObj = { group: 1, id: 1 };
        break;
      case ListOrderByEnum._GROUP:
        sortObj = { group: -1, id: 1 };
        break;
      case ListOrderByEnum.STATUS:
        sortObj = { status: 1, id: 1 };
        break;
      case ListOrderByEnum._STATUS:
        sortObj = { status: -1, id: 1 };
        break;
      case ListOrderByEnum.MANAGER:
        sortObj = { manager: 1, id: 1 };
        break;
      case ListOrderByEnum._MANAGER:
        sortObj = { manager: -1, id: 1 };
        break;
    }

    return sortObj;
  }

  private getFilterObj(query: IQuery): FilterQuery<IOrder> {
    let filterObj: FilterQuery<IOrder> = {};
    if (query.name) {
      filterObj.name = { $regex: query.name, $options: "i" };
    }
    if (query.surname) {
      filterObj.surname = { $regex: query.surname, $options: "i" };
    }
    if (query.age) {
      filterObj.age = +query.age;
    }
    if (query.phone) {
      filterObj.phone = { $regex: query.phone, $options: "i" };
    }
    if (query.email) {
      filterObj.email = { $regex: query.email, $options: "i" };
    }
    if (query.course) {
      filterObj.course = { $regex: query.course, $options: "i" };
    }
    if (query.course_format) {
      filterObj.course_format = { $regex: query.course_format, $options: "i" };
    }
    if (query.course_type) {
      filterObj.course_type = { $regex: query.course_type, $options: "i" };
    }
    if (query.status === StatusEnum.NEW) {
      filterObj = {
        ...filterObj,
        $or: [{ status: { $eq: "New" } }, { status: { $eq: null } }],
      };
    } else if (query.status) {
      filterObj.status = query.status;
    }
    if (query.group) {
      filterObj.group = { $regex: query.group, $options: "i" };
    }
    if (query.start_date) {
      const date = new Date(query.start_date);
      // const form = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
      filterObj.created_at = { $gte: date.toISOString() };
    }
    if (query.end_date) {
      const date = new Date(query.end_date);
      const stdate = query.start_date ? new Date(query.start_date) : null;
      filterObj.created_at = stdate
        ? { $not: { $lt: stdate.toISOString() }, $lte: date.toISOString() }
        : { $lte: date.toISOString() };
    }
    if (query.manager) {
      filterObj.manager = query.manager;
    }
    return filterObj;
  }
}

export const orderRepository = new OrderRepository();
