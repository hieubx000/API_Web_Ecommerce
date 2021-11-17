const CategoryModel = require('./category')
const HttpError = require('../../common/httpError')

const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const getAllCategory = async(req, res) => {
    console.log("22");
    const category = await CategoryModel.find();
    res.send({
        success: 1,
        data: category
    })
}

const getCategory = async(req, res) => {
    const { slug } = req.params;
    const foundCategory = await CategoryModel.findOne({ slug })

    res.send({
        success: 1,
        data: foundCategory
    })
}

const createCategory = async(req, res) => {
    const { name } = req.body;

    if (!name) {
        throw new HttpError("Category không được để trống", 422)
    }
    const existedCategory = await CategoryModel.findOne({ name })
    if (existedCategory) {
        throw new HttpError("Category đã tồn tại", 400)
    }

    const newCategory = await CategoryModel.create({ name })
    res.send({
        success: 1,
        data: newCategory
    })
}

const updateCategory = async(req, res) => {
    const { slug } = req.params;
    const { name } = req.body;
    if (!name) {
        throw new HttpError("Category không được để trống", 422)
    }
    const existedCategory = await CategoryModel.findOne({ name });
    console.log(name);
    if (existedCategory) {
        throw new HttpError("Category đã tồn tại", 400)
    }
    // const newSlug = {
    //     slug: {
    //         type: String,
    //         slug: name,
    //         unique: true,
    //         lowercase: true
    //     }
    // }
    const updateCategory = await CategoryModel.findOneAndUpdate({ slug }, { name }, { new: true })

    res.send({
        success: 1,
        data: updateCategory
    })
}


module.exports = {
    getAllCategory,
    getCategory,
    createCategory,
    updateCategory
}