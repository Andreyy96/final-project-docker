import Joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { IUser } from "../interfaces/user.interface";

export class AuthValidator {
  public static schemaForLogin: Joi.ObjectSchema<Partial<IUser>> = Joi.object({
    email: Joi.string()
      .regex(regexConstant.EMAIL)
      .lowercase()
      .trim()
      .required(),
    password: Joi.string().trim().required(),
  });

  public static schemaForSetPassword: Joi.ObjectSchema<{
    password: string;
    confirm_password: string;
  }> = Joi.object({
    password: Joi.string()
      .regex(regexConstant.PASSWORD)
      .trim()
      .required()
      .messages({
        "string.pattern.base":
          "at lest 1 character, at lest 1 number, at lest 1 special character, min 5 in length",
        "string.empty": `"password" cannot be an empty field`,
        "any.required": `"password" is a required field`,
      }),
    confirm_password: Joi.string()
      .regex(regexConstant.PASSWORD)
      .trim()
      .required()
      .messages({
        "string.empty": `"confirm_password" cannot be an empty field`,
        "any.required": `"confirm_password" is a required field`,
        "any.only": `"confirm_password" not equal "email"`,
      }),
  });
}
