const BrandModel = require('./brand')
const SubCategoryModel = require('../sub-category/sub-category')
const HttpError = require('../../common/httpError')

const getAllBrand = async(req, res) => {
    const brand = await BrandModel.find();
    res.send({
        success: 1,
        data: brand
    })
}

const getBrand = async(req, res) => {
    const { slug } = req.params;
    const foundBrand = await BrandModel.findOne({ slug })

    res.send({
        success: 1,
        data: foundBrand
    })
}

const createBrand = async(req, res) => {
    const { name, subCategoryId, brand, imgBrand, description } = req.body;

    if (!name) {
        throw new HttpError("Brand không được để trống", 422)
    }
    const existedBrand = await BrandModel.findOne({ name })
    if (existedBrand) {
        throw new HttpError("Brand đã tồn tại", 400)
    }
    const existedSubCategory = await SubCategoryModel.findById(subCategoryId)
    if (!existedSubCategory) {
        throw new HttpError("Không có Sub-Category", 400)
    }

    const newBrand = await BrandModel.create({ name, subCategoryId, brand, imgBrand, description })
    res.send({
        success: 1,
        data: newBrand
    })
}

const updateBrand = async(req, res) => {
    const { slug } = req.params;
    const { name, subCategoryId, brand, imgBrand, description } = req.body;
    if (!name) {
        throw new HttpError("Brand không được để trống", 422)
    }
    const existedBrand = await BrandModel.findOne({ name });
    const existedBrandBySlug = await BrandModel.findOne({ slug })
        // console.log(existedBrand);
    if (existedBrand) {
        if (existedBrandBySlug.name !== name) {
            throw new HttpError("Brand đã tồn tại", 400)
        }
    }
    console.log("hi");
    const existedCategory = await SubCategoryModel.findById(subCategoryId)
    if (!existedCategory) {
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