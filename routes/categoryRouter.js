const categoryController = require('../controllers/categoryController.js')

const router = require('express').Router()

router.post('/addCategory', categoryController.addCategory)

router.get('/', categoryController.getAllCategories)

router.get('/:id', categoryController.getOneCategory)

router.put('/:id', categoryController.updateCategory)

router.delete('/:id', categoryController.deleteCategory)

module.exports = router