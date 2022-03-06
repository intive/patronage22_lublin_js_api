const router = require('express').Router();
const { upload } = require('./uploadRouter.js');
const photosController = require('../controllers/photosController.js');

router.route('/').all(upload.single('image')).post(photosController.addPhoto)

module.exports = router;
