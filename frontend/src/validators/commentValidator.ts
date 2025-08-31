import Joi from "joi";

const commentValidator = Joi.object({
    comment: Joi.string().min(3).max(25).required()
})

export {
    commentValidator
}