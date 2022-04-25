const pageController = require("../controllers/pagesController.js");

const router = require("express").Router();

router.use((req, res, next) => {
  if (req.headers["authorization"]) {
    return next("router");
  }
  next();
});

router.get("/", pageController.getAllPages);

router.get("/:slug", pageController.getOnePageBySlug);


module.exports = router;
