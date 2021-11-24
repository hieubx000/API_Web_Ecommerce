const SubCategoryModel = require('./sub-category')
const CategoryModel = require('../category/category')
const HttpError = require('../../common/httpError');
const ProductModel = require('../product/product');
const BrandModel = require('../brand/brand')

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
    const subCategoryId = foundSubCategory.id
    const foundProduct = await ProductModel.findOne({ subCategoryId })

    const foundBrand = await BrandModel.findOne({ subCategoryId })
    const brandId = foundBrand.id
    console.log(foundBrand);
    foundProduct += await ProductModel.findOne({ brandId })
    res.send({
        success: 1,
        data: foundProduct
    })
}

const createSubCategory = async(req, res) => {
    const { name, categoryId } = req.body;


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