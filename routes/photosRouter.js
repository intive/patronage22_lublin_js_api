const photosController = require('../controllers/photosController.js');

const router = require('express').Router()

router.post('/', photosController.addPhoto)

router.get('/', photosController.getAllPhotos)

router.get('/getAllPhotosByProductId/:id', photosController.getAllPhotosByProductId)

router.get('/getMainPhotoByProductId/:id', photosController.getMainPhotoByProductId)

router.get('/getOnePhotoById/:id', photosController.getOnePhotoById)

router.put('/updatePhotoById/:id', photosController.updatePhotoById)

router.delete('/removeOneById/:id', photosController.removeOneById)

router.delete('/removeAllByProductId/:id', photosController.removeAllByProductId)


module.exports = router