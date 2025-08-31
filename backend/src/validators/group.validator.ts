import Joi from "joi";

export class GroupValidator {
  public static createGroupDTO = Joi.object({
    name: Joi.string().min(4).max(20).required(),
  });
}
