const router = require('express').Router();
const subCategoryController = require('./sub-category.controller');

router.get('/', subCategoryController.getAllSubCategory)
router.get('/:slug', subCategoryController.getSubCategory)
router.post('/', subCategoryController.createSubCategory)
router.put('/:slug', subCategoryController.updateSubCategory)
router.delete('/:slug', subCategoryController.deleteSubCategory)

module.exports = router;