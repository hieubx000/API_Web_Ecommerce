const router = require('express').Router();
const multer = require('multer')
const uploadController = require('./upload.controller')

const memoryStorage = multer.memoryStorage();

const uploadWithMemory = multer({ storage: memoryStorage })


router.post('/', uploadWithMemory.single('file'), uploadController.uploadToCloud)

module.exports = router