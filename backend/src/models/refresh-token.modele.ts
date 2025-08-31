import { model, Schema } from "mongoose";

import { IRefreshToken } from "../interfaces/refresh-token.interface";
import { User } from "./user.model";

const refreshTokenSchema = new Schema(
  {
    refreshToken: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RefreshToken = model<IRefreshToken>(
  "refresh-tokens",
  refreshTokenSchema,
);
