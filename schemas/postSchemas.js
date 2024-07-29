import Joi from 'joi'

export const bodyPostSchema = Joi.object({
    body: Joi.object({
        content: Joi.string().max(255).required(),
        imageUrl: Joi.string().uri().optional(),
        userId: Joi.number().required().prefs({convert: false})
    })
})

export const idPostSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().pattern(/^[0-9]+$/ , 'id must be a number').required()
    })
});

export const updatePostSchema = Joi.object({
    body: bodyPostSchema.extract('body'),
    params: idPostSchema.extract('params')
})