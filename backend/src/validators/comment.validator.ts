import Joi from "joi";

import { ICreateComment } from "../interfaces/comment.intarface";

export class CommentValidator {
  public static schemaForCreateComment: Joi.ObjectSchema<ICreateComment> =
    Joi.object({
      body: Joi.string().min(3).max(25).required(),
    });
}
