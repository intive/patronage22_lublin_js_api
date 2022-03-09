const multer = require('multer');
const router = require('express').Router();
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    req.originalUrl === '/uploadPhotos'
      ? cb(null, './uploads/images')
      : cb(null, './uploads');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}_${file.originalname.replace(/\s+/g, '')}`
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

module.exports = router;
module.exports.upload = upload;
