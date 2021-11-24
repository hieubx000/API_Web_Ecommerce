const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const SubCategorySchema = mongoose.Schema({
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
    categoryId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
}, {
    timestamps: true
})

const SubCategoryModel = mongoose.model("SubCategory", SubCategorySchema)

module.exports = SubCategoryModel;