const CategoryModel = require('./category')
const BrandModel = require('../brand/brand')
const ProductModel = require('../product/product')
const HttpError = require('../../common/httpError');
const SubCategoryModel = require('../sub-category/sub-category');

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
    const { sortDirection, sortField, skip, limit } = req.query
    const { slug } = req.params;
    const foundCategory = await CategoryModel.findOne({ slug })
    const categoryId = foundCategory.id

    const categoryFilter = categoryId ? { categoryId } : {}
    const foundSubCategory = await SubCategoryModel.find(categoryFilter)
    const subCategoryId = []
    for (let i = 0; i < foundSubCategory.length; i++) {
        subCategoryId.push(foundSubCategory[i].id)
    }

    var total = 0;
    var product = [];
    for (let i = 0; i < subCategoryId.length; i++) {


        // console.log(foundSubCategory[i].id);
        var subCategoryId1 = subCategoryId[i]
            // console.log(subCategoryId1);
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
        var [foundProductOfBrand, totalProductOfBrand] = await Promise.all([
            ProductModel
            .findOne({ subCategoryId: subCategoryId1 })
            .sort(sortParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
            ProductModel.findOne({ subCategoryId: subCategoryId1 }).countDocuments()
        ])


        if (foundProductOfBrand) {
            product.push(foundProductOfBrand)
            foundProductOfBrand = [];
            total += totalProductOfBrand
                // console.log(i);
        } else {
            // console.log(subCategoryId1);
            // const subCategoryFilter = subCategoryId1 ? { subCategoryId } : {}
            // console.log(subCategoryFilter);
            // const foundSubCategory
            // for (let j = 0; j < subCategoryFilter.length; j++) {
            //     console.log(j);
            // }
            const filter = {
                id: subCategoryId1
            }
            let foundBrand = await BrandModel.find({ subCategoryId: { $in: subCategoryId1 } })
            var brandId = []
                // console.log(brandId);
            for (let i = 0; i < foundBrand.length; i++) {
                brandId.push(foundBrand[i].id)
            }
            // console.log(i, brandId);
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
                // console.log(brandId);
            if (brandId.length > 0) {

            }
            for (let i = 0; i < brandId.length; i++) {
                const brandFilter = brandId[i] ? { brandId } : {}
                var [foundProduct1, totalProductOfSubCategory] = await Promise.all([
                    ProductModel
                    .find(brandFilter)
                    .sort(sortParams)
                    .skip(pagination.skip)
                    .limit(pagination.limit),
                    ProductModel.find(brandFilter).countDocuments()
                ])
            }
            // console.log(foundProduct1);
            product.push(foundProduct1)
            foundProduct1 = null;
            total += totalProductOfSubCategory;

        }

    }
    // console.log(product);

    // console.log(subCategoryId);



    // const foundCategory = await CategoryModel.findOne({ slug })
    res.send({
        success: 1,
        data: product,
        total: total
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