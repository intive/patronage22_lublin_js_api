const photosController = require('../controllers/photosController.js');

const router = require('express').Router()

router.post('/', photosController.addPhoto)

router.get('/', photosController.getAllPhotos)

router.get('/allActive', photosController.getAllActivePhotos)

router.get('/allMain', photosController.getAllMainPhotos)

router.get('/:id', photosController.getOnePhotoByProductId)

router.put('/:id', photosController.updatePhotoByProductId)

router.delete('/:id', photosController.deletePhotoByProductId)


module.exports = router