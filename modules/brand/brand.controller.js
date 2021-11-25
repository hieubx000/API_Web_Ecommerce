const BrandModel = require('./brand')
const SubCategoryModel = require('../sub-category/sub-category')
const ProductModel = require('../product/product')
const HttpError = require('../../common/httpError')

const getAllBrand = async(req, res) => {
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

    const [brand, totalBrand] = await Promise.all([
        BrandModel
        .find(keywordFilter)
        .sort(sortParams)
        .skip(pagination.skip)
        .limit(pagination.limit),
        BrandModel.find(keywordFilter).countDocuments()
    ])

    res.send({
        success: 1,
        data: brand,
        totalBrand
    })
}

const getBrand = async(req, res) => {
    const { sortDirection, sortField, skip, limit } = req.query

    const { slug } = req.params;
    const foundBrand = await BrandModel.findOne({ slug })
    const brandId = foundBrand.id

    // FILTER
    const brandFilter = brandId ? { brandId } : {}
    console.log(brandFilter);
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

    const [foundProduct, totalProduct] = await Promise.all([
        ProductModel
        .find(brandFilter)
        .sort(sortParams)
        .skip(pagination.skip)
        .limit(pagination.limit),
        ProductModel.find(brandFilter).countDocuments()
    ])

    res.send({
        success: 1,
        data: foundProduct,
        total: totalProduct
    })
}

const createBrand = async(req, res) => {
    const brandData = req.body;
    const name = brandData.name

    const existedBrand = await BrandModel.findOne({ name })
    if (existedBrand) {
        throw new HttpError("Brand đã tồn tại", 400)
    }
    const existedSubCategory = await SubCategoryModel.findById(brandData.subCategoryId)
    if (!existedSubCategory) {
        throw new HttpError("Không có Sub-Category", 400)
    }

    const newBrand = await BrandModel.create(brandData)
    res.send({
        success: 1,
        data: newBrand
    })
}

const updateBrand = async(req, res) => {
    const { slug } = req.params;
    const { name, subCategoryId, brand, imgBrand, description } = req.body;

    const existedBrand = await BrandModel.findOne({ name });
    const existedBrandBySlug = await BrandModel.findOne({ slug })
        // console.log(existedBrand);
    if (existedBrand) {
        if (existedBrandBySlug.name !== name) {
            throw new HttpError("Brand đã tồn tại", 400)
        }
    }

    console.log("hi");
    const existedSubCategory = await SubCategoryModel.findById(subCategoryId)
    if (!existedSubCategory) {
        throw new HttpError("Không có Sub-Category", 400)
    }
    const updateBrand = await BrandModel.findOneAndUpdate({ slug }, { name, subCategoryId, brand, imgBrand, description }, { new: true })

    res.send({
        success: 1,
        data: updateBrand
    })
}

const deleteBrand = async(req, res) => {
    const { slug } = req.params;
    const deleteBrand = await BrandModel.findOneAndDelete({ slug })
    res.send({
        success: 1,
        data: deleteBrand
    })
}


module.exports = {
    getAllBrand,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
}