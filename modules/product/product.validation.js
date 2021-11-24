const Joi = require('joi')

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    imgProduct: Joi.string().pattern(new RegExp('^http.*$')).required(),
    price: Joi.number().allow(null),
    quantity: Joi.number().allow(null),
    description: Joi.string().allow('').allow(null),
    subCategoryId: Joi.string().allow(null),
    brandId: Joi.string().allow(null),
    warranty: Joi.number().allow(null)
})
const updateProductSchema = Joi.object({
    name: Joi.string().required(),
    imgProduct: Joi.string().pattern(new RegExp('^http.*$')).required(),
    price: Joi.number().allow(null),
    quantity: Joi.number().allow(null),
    description: Joi.string().allow('').allow(null),
    subCategoryId: Joi.string().required(),
    brandId: Joi.string().required(),
    warranty: Joi.number().allow(null)
})

module.exports = {
    createProductSchema,
    updateProductSchema
}