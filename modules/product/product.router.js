const router = require('express').Router();
const ProductController = require('./product.controller');
const validateInput = require('../../common/middlewares/validateInput')
const productValid = require('./product.validation')

router.get('/', ProductController.getAllProduct)
router.get('/:slug', ProductController.getProduct)
router.post('/',
    validateInput(productValid.createProductSchema, 'body'),
    ProductController.createProduct)
router.put('/:slug',
    validateInput(productValid.updateProductSchema, 'body'),
    ProductController.updateProduct)
router.delete('/:slug', ProductController.deleteProduct)

module.exports = router;