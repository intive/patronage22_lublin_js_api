const { StatusCodes } = require("http-status-codes");
const multer = require("multer");
const router = require("express").Router();
const path = require("path");
const { CustomAPIError } = require("../errors");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "/uploads/images/");
  },
  filename(req, file, cb) {
    console.log(`file`, file);
    cb(
      null,
      `${Date.now()}_${file.originalname.split(".")[0]}${path.extname(
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
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (err, req, res, next) => {
  if (err) throw new CustomAPIError("Unable to upload your file. Try again");
  try {
    next();
  } catch (err) {
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ msg: { err } });
  }
});

module.exports = router;
