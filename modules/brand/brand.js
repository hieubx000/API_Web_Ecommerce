const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const BrandSchema = mongoose.Schema({
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
    subCategoryId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    imgBrand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamp: true
})

const BrandModel = mongoose.model("Brand", BrandSchema)

module.exports = BrandModel;