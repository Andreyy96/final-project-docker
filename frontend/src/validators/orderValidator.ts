import Joi from "joi";
import {regexConstant} from "../constants/regex";

const orderValidator = Joi.object({
    name: Joi.string().allow(null, '').required(),
    surname: Joi.string().allow(null, '').required(),
    email: Joi.string().regex(regexConstant.EMAIL).allow(null, '').required().messages({
        'string.pattern.base':'invalid email',
    }),
    phone: Joi.string().regex(regexConstant.PHONE).allow(null, '').required().messages({
        'string.pattern.base':'invalid phone',
    }),
    age: Joi.number().min(18).max(100).allow(null, '').required(),
    course: Joi.string().allow(null, '').required(),
    course_format: Joi.string().allow(null, '').required(),
    course_type: Joi.string().allow(null, '').required(),
    sum: Joi.number().min(1000).allow(null, '').required(),
    already_paid: Joi.number().min(1000).allow(null, '').required(),
    status: Joi.string().allow(null, '').required(),
    group: Joi.string().allow(null, '').required(),
});

export {
    orderValidator
}