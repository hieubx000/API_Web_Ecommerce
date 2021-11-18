const SubCategoryModel = require('./sub-category')
const CategoryModel = require('../category/category')
const HttpError = require('../../common/httpError')

const getAllSubCategory = async(req, res) => {
    const category = await SubCategoryModel.find();
    res.send({
        success: 1,
        data: category
    })
}

const getSubCategory = async(req, res) => {
    const { slug } = req.params;
    const foundSubCategory = await SubCategoryModel.findOne({ slug })

    res.send({
        success: 1,
        data: foundSubCategory
    })
}

const createSubCategory = async(req, res) => {
    const { name, categoryId } = req.body;

    if (!name) {
        throw new HttpError("Sub-Category không được để trống", 422)
    }
    const existedSubCategory = await SubCategoryModel.findOne({ name })
    if (existedSubCategory) {
        throw new HttpError("Sub-Category đã tồn tại", 400)
    }
    const existedCategory = await CategoryModel.findById(categoryId)
    if (!existedCategory) {
        throw new HttpError("Không có Category", 400)
    }

    const newSubCategory = await SubCategoryModel.create({ name, categoryId })
    res.send({
        success: 1,
        data: newSubCategory
    })
}

const updateSubCategory = async(req, res) => {
    const { slug } = req.params;
    const { name, categoryId } = req.body;
    if (!name) {
        throw new HttpError("Sub-Category không được để trống", 422)
    }
    const existedSubCategory = await SubCategoryModel.findOne({ name });
    const existedSubCategoryBySlug = await SubCategoryModel.findOne({ slug })
    if (existedSubCategory) {
        if (existedSubCategoryBySlug.name !== name) {
            throw new HttpError("Sub-Category đã tồn tại", 400)
        }
    }

    const existedCategory = await CategoryModel.findOne({ _id: categoryId })
    console.log(existedCategory);
    if (!existedCategory) {
        throw new HttpError("Không có Category", 400)
    }
    const updateSubCategory = await SubCategoryModel.findOneAndUpdate({ slug }, { name, categoryId }, { new: true })

    res.send({
        success: 1,
        data: updateSubCategory
    })
}

const deleteSubCategory = async(req, res) => {
    const { slug } = req.params;
    const deleteSubCategory = await SubCategoryModel.findOneAndDelete({ slug })
    res.send({
        success: 1,
        data: deleteSubCategory
    })
}


module.exports = {
    getAllSubCategory,
    getSubCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
}