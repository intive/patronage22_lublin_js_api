const pagesController = require('../controllers/pagesController.js');

const router = require('express').Router();

router.post('/addPage', pagesController.addPage);

router.get('/', pagesController.getAllPages);

router.get('/:id', pagesController.getOnePage);

router.put('/:id', pagesController.updatePage);

router.delete('/:id', pagesController.deletePage);

module.exports = router;
