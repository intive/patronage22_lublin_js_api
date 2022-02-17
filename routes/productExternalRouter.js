const productController = require('../controllers/productController.js')

const router = require('express').Router()

router.get('/getAllProductsExternal', productController.getAllProducts)

router.get('/getAllPublishedProductsExternal', productController.getPublishedProducts)

router.get('/external/:id', productController.getOneProduct)

module.exports = router