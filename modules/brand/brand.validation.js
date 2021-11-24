const Joi = require('joi')

const createBrandSchema = Joi.object({
    name: Joi.string().required(),
    imgBrand: Joi.string().pattern(new RegExp('^http.*$')).required(),
    description: Joi.string().allow('').allow(null),
    subCategoryId: Joi.string().required()
})
const updateBrandSchema = Joi.object({
    name: Joi.string().required(),
    imgBrand: Joi.string().pattern(new RegExp('^http.*$')).required(),
    description: Joi.string().allow('').allow(null),
    subCategoryId: Joi.string().required()
})

module.exports = {
    createBrandSchema,
    updateBrandSchema
}