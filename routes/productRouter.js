const productController = require('../controllers/productController.js');

const router = require('express').Router();

router.post('/addProduct', productController.addProduct);

router.get('/getAllProducts', productController.getAllProducts);

router.get('/getAllPublishedProducts', productController.getPublishedProducts);

router.get('/getAllProductsByCategoriesId/:id', productController.getProductsByCategoryId);

router.get('/:id', productController.getOneProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
