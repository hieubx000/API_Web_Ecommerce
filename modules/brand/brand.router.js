const router = require('express').Router();
const BrandController = require('./brand.controller');

router.get('/', BrandController.getAllBrand)
router.get('/:slug', BrandController.getBrand)
router.post('/', BrandController.createBrand)
router.put('/:slug', BrandController.updateBrand)
router.delete('/:slug', BrandController.deleteBrand)

module.exports = router;