const SubCategoryModel = require('./sub-category')
const CategoryModel = require('../category/category')
const HttpError = require('../../common/httpError');
const ProductModel = require('../product/product');
const BrandModel = require('../brand/brand')

const getAllSubCategory = async(req, res) => {
    const { keyword, sortDirection, sortField, skip, limit } = req.query

    // FILTER
    const keywordFilter = keyword ? { name: { $regex: new RegExp(keyword, 'i') } } : {};

    // SORT
    const sortDirectionParams = sortDirection ? Number(sortDirection) : -1
    const sortParams = sortField ? {
        [sortField]: sortDirectionParams
    } : {}

    // PAGINATION
    const pagination = {
        skip: skip ? Number(skip) : 0,
        limit: limit ? Number(limit) : 100
    }

    const [subCategory, totalSubCategory] = await Promise.all([
        SubCategoryModel
        .find(keywordFilter)
        .sort(sortParams)
        .skip(pagination.skip)
        .limit(pagination.limit),
        SubCategoryModel.find(keywordFilter).countDocuments()
    ])
    res.send({
        success: 1,
        data: subCategory,
        total: totalSubCategory
    })
}

const getSubCategory = async(req, res) => {
    const { slug } = req.params;
    const foundSubCategory = await SubCategoryModel.findOne({ slug })
    const subCategoryId = foundSubCategory.id

    var foundProduct = await ProductModel.findOne({ subCategoryId })
        // console.log(foundProduct);
    var product = 0;
    if (foundProduct) {
        product = foundProduct
    } else {
        const subCategoryFilter = subCategoryId ? { subCategoryId } : {}
        const foundBrand = await BrandModel.find(subCategoryFilter)
        var brandId = []
        console.log(foundBrand[0].id);
        for (let i = 0; i < foundBrand.length; i++) {
            brandId.push(foundBrand[i].id)
        }
        console.log(brandId);
        // const brandId = foundBrand.id
        var foundProduct1 = []
        for (let i = 0; i < brandId.length; i++) {
            const brandFilter = brandId[i] ? { brandId } : {}
            foundProduct1 = await ProductModel.find(brandFilter)
        }

        product = foundProduct1
    }

    res.send({
        success: 1,
        data: product
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