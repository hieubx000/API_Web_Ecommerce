const Joi = require('joi')

const createSubCategorySchema = Joi.object({
    name: Joi.string().required(),
    categoryId: Joi.string().required()
})

const updateSubCategorySchema = Joi.object({
    name: Joi.string().required(),
    categoryId: Joi.string().required()
})

module.exports = {
    createSubCategorySchema,
    updateSubCategorySchema
}