const pageController = require("../controllers/pagesController.js");

const router = require("express").Router();

router.use((req, res, next) => {
  if (req.headers["authorization"]) {
    return next("router");
  }
  next();
});

router.post("/addPage", pageController.addPage);

router.get("/", pageController.getAllPages);

router.get("/:id", pageController.getOnePage);

router.put("/:id", pageController.updatePage);

router.delete("/:id", pageController.deletePage);

module.exports = router;
