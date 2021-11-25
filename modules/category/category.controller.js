const CategoryModel = require('./category')
const HttpError = require('../../common/httpError')

const getAllCategory = async(req, res) => {
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

    const [category, totalCategory] = await Promise.all([
        CategoryModel
        .find(keywordFilter)
        .sort(sortParams)
        .skip(pagination.skip)
        .limit(pagination.limit),
        CategoryModel.find(keywordFilter).countDocuments()
    ])

    res.send({
        success: 1,
        data: category,
        total: totalCategory
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

    const existedCategory = await CategoryModel.findOne({ name });
    console.log(name);
    if (existedCategory) {
        throw new HttpError("Category đã tồn tại", 400)
    }

    const updateCategory = await CategoryModel.findOneAndUpdate({ slug }, { name }, { new: true })

    res.send({
        success: 1,
        data: updateCategory
    })
}

const deleteCategory = async(req, res) => {
    const { slug } = req.params;
    const deleteCategory = await CategoryModel.findOneAndDelete({ slug })
    res.send({
        success: 1,
        data: deleteCategory
    })
}


module.exports = {
    getAllCategory,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}