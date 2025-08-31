import { model, Schema } from "mongoose";

import { IOrder } from "../interfaces/order.interface";
import { User } from "./user.model";

const orderSchema = new Schema(
  {
    id: { type: Number, unique: true },
    name: { type: String },
    surname: { type: String },
    email: { type: String },
    phone: { type: String },
    age: { type: Number },
    course: { type: String },
    course_format: { type: String },
    course_type: { type: String },
    sum: { type: Number },
    already_paid: { type: Number },
    created_at: { type: String },
    utm: { type: String },
    msg: { type: String },
    status: { type: String },
    group: { type: String },
    manager: { type: String },
    _userId: { type: Schema.Types.ObjectId, required: false, ref: User },
  },
  {
    versionKey: false,
  },
);

export const Order = model<IOrder>("orders", orderSchema);
