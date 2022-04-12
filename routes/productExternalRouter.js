const productController = require('../controllers/productController.js')

const router = require('express').Router()

router.use((req, res, next) => {
  if(req.headers['authorization']) {
    return next('router')
  }
  next()
})

router.get('/', productController.getAllProductsExternal)

router.get('/getAllPublishedProductsExternal', productController.getPublishedProductsExternal)

router.get('/external/:id', productController.getOneProductExternal)

module.exports = router