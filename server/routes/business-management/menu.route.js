const {MenuController} = require('../../controller/business-management/');

const router = require('express').Router();

// /business-management/menu

router.get('/', MenuController.getAll);
router.get('/:id', MenuController.get);
router.post('/', MenuController.create);
router.patch('/:id', MenuController.update);
router.delete('/:id', MenuController.delete)


module.exports = router;
