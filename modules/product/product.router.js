const router = require('express').Router();
const ProductController = require('./product.controller');

router.get('/', ProductController.getAllProduct)
router.get('/:slug', ProductController.getProduct)
router.post('/', ProductController.createProduct)
router.put('/:slug', ProductController.updateProduct)
router.delete('/:slug', ProductController.deleteProduct)

module.exports = router;