const multer = require('multer');
const router = require('express').Router();
const path = require('path');
const photosController = require('../controllers/photosController.js');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/images/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}_${file.originalname.split('.')[0]}${path.extname(
        file.originalname
      )}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.route('/').post(upload.single('image'), (req, res) => {
  res.send(`${req.file.path}`);
});

router.route('/api/photos').all(upload.single('image')).post(photosController.addPhoto);

module.exports = router;
