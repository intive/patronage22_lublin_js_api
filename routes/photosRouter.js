const photosController = require('../controllers/photosController.js');
const { ensureFileIsPresent } = require('./uploadPhotosRouter.js');

const router = require('express').Router()

router.get('/', photosController.getAllPhotos)

router.get('/getAllPhotosByProductId/:id', photosController.getAllPhotosByProductId)

router.get('/getMainPhotoByProductId/:id', photosController.getMainPhotoByProductId)

router.get('/getPhotoById/:id', photosController.getPhotoById)

router.put('/updatePhotoById/:id', photosController.updatePhotoById)

router.delete('/deletePhotoById/:id', photosController.deletePhotoById)

router.delete('/removeAllPhotosByProductId/:id', photosController.removeAllPhotosByProductId)


module.exports = router