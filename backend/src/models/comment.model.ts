import { model, Schema } from "mongoose";

import { IComment } from "../interfaces/comment.intarface";
import { Order } from "./order.model";
import { User } from "./user.model";

const commentSchema = new Schema(
  {
    body: { type: String, required: true },
    date: { type: String, required: true },
    manager_name: { type: String, required: true },
    manager_surname: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
    _orderId: { type: Schema.Types.ObjectId, required: true, ref: Order },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Comment = model<IComment>("comments", commentSchema);
