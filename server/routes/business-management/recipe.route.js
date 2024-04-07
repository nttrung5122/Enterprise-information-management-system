const {RecipeController} = require('../../controller/business-management/');

const router = require('express').Router();

// /business-management/recipe

router.get('/', RecipeController.getAll);
router.get('/:id', RecipeController.get);
router.post('/', RecipeController.create);
router.patch('/:id', RecipeController.update);
router.delete('/:id', RecipeController.delete)


module.exports = router;
