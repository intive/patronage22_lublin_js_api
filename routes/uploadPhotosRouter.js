const router = require('express').Router();
const { upload } = require('./uploadRouter.js');
const photosController = require('../controllers/photosController.js');

const ensureFileIsPresent = (req, res, next) => {
  if (!req.file) {
    return res.status(422).json({ message: 'Image is required.' });
  }
  else {
    next();
  }
};

router.route('/').all(upload.single('image'), ensureFileIsPresent).post(photosController.addPhoto);

module.exports = router;
