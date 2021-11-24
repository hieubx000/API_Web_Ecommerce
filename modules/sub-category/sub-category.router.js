const router = require('express').Router();
const subCategoryController = require('./sub-category.controller');
const validateInput = require('../../common/middlewares/validateInput')
const subCategoryValid = require('./sub-category.validation')

router.get('/', subCategoryController.getAllSubCategory)
router.get('/:slug', subCategoryController.getSubCategory)
router.post('/',
    validateInput(subCategoryValid.createSubCategorySchema),
    subCategoryController.createSubCategory)
router.put('/:slug',
    validateInput(subCategoryValid.updateSubCategorySchema),
    subCategoryController.updateSubCategory)
router.delete('/:slug', subCategoryController.deleteSubCategory)

module.exports = router;