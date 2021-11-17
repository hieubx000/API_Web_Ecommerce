const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true,
        lowercase: true
    }
}, {
    timestamps: true
})

const CategoryModel = mongoose.model('Category', CategorySchema)

module.exports = CategoryModel;