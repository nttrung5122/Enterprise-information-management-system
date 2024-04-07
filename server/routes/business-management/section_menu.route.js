const {SectionMenuController} = require('../../controller/business-management/');

const router = require('express').Router();

// /business-management/section-menu

router.get('/', SectionMenuController.getAll);
router.get('/:id', SectionMenuController.get);
router.post('/', SectionMenuController.create);
router.patch('/:id', SectionMenuController.update);
router.delete('/:id', SectionMenuController.delete)


module.exports = router;
