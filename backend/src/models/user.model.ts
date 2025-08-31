import { model, Schema } from "mongoose";

import { UserRoleEnum } from "../enums/user-role.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
  {
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    role: { type: String, enum: UserRoleEnum },
    is_active: { type: Boolean, default: false },
    last_login: { type: String, required: false, default: null },
    is_banned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<IUser>("users", userSchema);
