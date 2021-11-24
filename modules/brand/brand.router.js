const router = require('express').Router();
const BrandController = require('./brand.controller');
const validateInput = require('../../common/middlewares/validateInput')
const brandValid = require('./brand.validation')


router.get('/', BrandController.getAllBrand)
router.get('/:slug', BrandController.getBrand)
router.post('/',
    validateInput(brandValid.createBrandSchema, 'body'),
    BrandController.createBrand)
router.put('/:slug',
    validateInput(brandValid.updateBrandSchema, 'body'),
    BrandController.updateBrand)
router.delete('/:slug', BrandController.deleteBrand)

module.exports = router;