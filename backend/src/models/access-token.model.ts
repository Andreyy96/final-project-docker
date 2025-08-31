import { model, Schema } from "mongoose";

import { IAccessToken } from "../interfaces/access-token.interface";
import { User } from "./user.model";

const accessTokenSchema = new Schema(
  {
    accessToken: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const AccessToken = model<IAccessToken>(
  "access-tokens",
  accessTokenSchema,
);
