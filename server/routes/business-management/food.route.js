const {FoodController} = require('../../controller/business-management');

const router = require('express').Router();

// /business-management/food

router.get('/', FoodController.getAll);
router.get('/:id', FoodController.get);
router.post('/', FoodController.create);
router.patch('/:id', FoodController.update);
router.delete('/:id', FoodController.delete)


module.exports = router;
