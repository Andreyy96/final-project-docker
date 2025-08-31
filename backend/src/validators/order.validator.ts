import Joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { CourseEnum } from "../enums/course.enum";
import { CourseFormatEnum } from "../enums/course-format.enum";
import { CourseTypeEnum } from "../enums/course-type.enum";
import { ListOrderByEnum } from "../enums/orderBy.enum";
import { StatusEnum } from "../enums/status.enum";

export class OrderValidator {
  public static listQuery = Joi.object({
    page: Joi.number().min(1).default(1),
    order: Joi.string().valid(...Object.values(ListOrderByEnum)),
    name: Joi.string().min(1),
    surname: Joi.string().min(1),
    email: Joi.string().min(1),
    phone: Joi.string().min(1),
    age: Joi.string().min(1),
    course: Joi.string().valid(...Object.values(CourseEnum)),
    course_format: Joi.string().valid(...Object.values(CourseFormatEnum)),
    course_type: Joi.string().valid(...Object.values(CourseTypeEnum)),
    status: Joi.string().valid(...Object.values(StatusEnum)),
    group: Joi.string().min(1),
    start_date: Joi.string(),
    end_date: Joi.string(),
    manager: Joi.string(),
  });

  public static updateOrder = Joi.object({
    name: Joi.string().allow(null, "").required(),
    surname: Joi.string().allow(null, "").required(),
    email: Joi.string().regex(regexConstant.EMAIL).allow(null, "").required(),
    phone: Joi.string().regex(regexConstant.PHONE).allow(null, "").required(),
    age: Joi.number().min(18).max(100).allow(null, "").required(),
    course: Joi.string()
      .valid(...Object.values(CourseEnum))
      .allow(null, "")
      .required(),
    course_format: Joi.string()
      .valid(...Object.values(CourseFormatEnum))
      .allow(null, "")
      .required(),
    course_type: Joi.string()
      .valid(...Object.values(CourseTypeEnum))
      .allow(null, "")
      .required(),
    sum: Joi.number().min(1000).allow(null, "").required(),
    already_paid: Joi.number().min(1000).allow(null, "").required(),
    status: Joi.string()
      .valid(...Object.values(StatusEnum))
      .allow(null, "")
      .required(),
    group: Joi.string().allow(null, "").required(),
  });
}
