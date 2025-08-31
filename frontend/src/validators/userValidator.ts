import Joi from "joi";
import {regexConstant} from "../constants/regex";


const userValidator = Joi.object({
    email: Joi.string().pattern(regexConstant.EMAIL).required().messages({
        'string.pattern.base':'invalid email',
        'string.empty': `"email" cannot be an empty field`,
        'any.required': `"email" is a required field`
    }),
    password: Joi.string().required().messages({
        'string.required':'password is required',
        'string.empty': `"password" cannot be an empty field`,
        'any.required': `"password" is a required field`
    }),
})

const createManagerValidator = Joi.object({
    name: Joi.string().min(3).max(20).trim().required().messages({
        'string.empty': `"name" cannot be an empty field`,
        'any.required': `"name" is a required field`
    }),
    surname: Joi.string().min(3).max(20).trim().required().messages({
        'string.empty': `"surname" cannot be an empty field`,
        'any.required': `"surname" is a required field`
    }),
    email: Joi.string().regex(regexConstant.EMAIL).required().messages({
        'string.pattern.base': 'invalid email',
        'string.empty': `"email" cannot be an empty field`,
        'any.required': `"email" is a required field`,
    }),
})

const schemaForSetPassword =  Joi.object({
        password: Joi.string().regex(regexConstant.PASSWORD).trim().required().messages({
            'string.pattern.base':'at lest 1 character, at lest 1 number, at lest 1 special character, min 5 in length',
            'string.empty': `"password" cannot be an empty field`,
            'any.required': `"password" is a required field`
        }),
        confirm_password: Joi.string().valid(Joi.ref('password')).trim().required().messages({
            'string.empty': `"confirm_password" cannot be an empty field`,
            'any.required': `"confirm_password" is a required field`,
            'any.only': `"confirm_password" not equal "email"`
        }),
    });


export {
    userValidator,
    createManagerValidator,
    schemaForSetPassword
}