const router = require('express').Router();
const categoryController = require('./category.controller');
const validateInput = require('../../common/middlewares/validateInput')
const categoryValid = require('./category.validation')

router.get('/', categoryController.getAllCategory)
router.get('/:slug', categoryController.getCategory)
router.post('/',
    validateInput(categoryValid.createCategorySchema, 'body'),
    categoryController.createCategory)
router.put('/:slug',
    validateInput(categoryValid.updateCategorySchema, 'body'),
    categoryController.updateCategory)
router.delete('/:slug', categoryController.deleteCategory)

module.exports = router;