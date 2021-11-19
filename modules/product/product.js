const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true,
        lowercase: true
    },
    imgProduct: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subCategoryId: {
        type: mongoose.Types.ObjectId,

    },
    brandId: {
        type: mongoose.Types.ObjectId,

    },
    warranty: {
        type: Number,
        required: true
    }
}, {
    timestamp: true
})

const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = ProductModel