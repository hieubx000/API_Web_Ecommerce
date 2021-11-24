const ProductModel = require('./product')
const BrandModel = require('../brand/brand')
const SubCategoryModel = require('../sub-category/sub-category')
const HttpError = require('../../common/httpError')

const getAllProduct = async(req, res) => {
    const { keyword, sortDirection, sortField, skip, limit } = req.query

    // FILTER
    const keywordFilter = keyword ? { name: { $regex: new RegExp(keyword, 'i') } } : {}

    // SORT
    const sortDirectionParams = sortDirection ? Number(sortDirection) : -1
    const sortParams = sortField ? {
        [sortField]: sortDirectionParams
    } : {}

    // PAGINATION
    const pagination = {
        skip: skip ? Number(skip) : 0,
        limit: limit ? Number(limit) : 24
    }

    const [product, totalProduct] = await Promise.all([
        ProductModel
        .find(keywordFilter)
        .sort(sortParams)
        .skip(pagination.skip)
        .limit(pagination.limit),
        ProductModel.find(keywordFilter).countDocuments()
    ])
    res.send({
        success: 1,
        data: product,
        total: totalProduct
    })
}

const getProduct = async(req, res) => {
    const { slug } = req.params;
    const foundProduct = await ProductModel.findOne({ slug })

    res.send({
        success: 1,
        data: foundProduct
    })
}

const createProduct = async(req, res) => {
    console.log("hi");
    const productData = req.body;
    const name = productData.name

    const existedProduct = await ProductModel.findOne({ name })
    if (existedProduct) {
        throw new HttpError("Product đã tồn tại", 400)
    }
    const existedSubCategory = await SubCategoryModel.findById(productData.subCategoryId)
    if (!existedSubCategory && productData.subCategoryId) {
        throw new HttpError("Không có Sub-Category", 400)
    }
    const existedBrand = await BrandModel.findById(productData.brandId)
    if (!existedBrand && productData.brandId) {
        throw new HttpError("Không có Brand", 400)
    }
    const newProduct = await ProductModel.create(productData)
    res.send({
        success: 1,
        data: newProduct
    })
}

const updateProduct = async(req, res) => {
    const { slug } = req.params;
    const updateData = req.body;
    const name = updateData.name

    const existedProduct = await ProductModel.findOne({ name });
    const existedProductBySlug = await ProductModel.findOne({ slug })
        // console.log(existedBrand);
    if (existedProduct) {
        if (existedProductBySlug.name !== name) {
            throw new HttpError("Brand đã tồn tại", 400)
        }
    }

    const existedSubCategory = await SubCategoryModel.findById(updateData.subCategoryId)
    if (!existedSubCategory && updateData.subCategoryId) {
        throw new HttpError("Không có Sub-Category", 400)
    }
    const existedBrand = await BrandModel.findById(updateData.brandId)
    if (!existedBrand && updateData.brandId) {
        throw new HttpError("Không có Brand", 400)
    }

    const updateProduct = await ProductModel.findOneAndUpdate({ slug }, updateData, { new: true })

    res.send({
        success: 1,
        data: updateProduct
    })
}

const deleteProduct = async(req, res) => {
    const { slug } = req.params;
    const deleteProduct = await ProductModel.findOneAndDelete({ slug })
    res.send({
        success: 1,
        data: deleteProduct
    })
}

module.exports = {
    getAllProduct,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}