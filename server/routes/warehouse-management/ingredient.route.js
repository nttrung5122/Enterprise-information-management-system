const router = require('express').Router(); 
const {IngredientsController} = require('../../controller/warehouse-management')

// /warehouse-management/ingredient
router.get('/',IngredientsController.getAll)
router.post('/',IngredientsController.create)
router.get('/:id',IngredientsController.get)
router.patch('/:id',IngredientsController.update)
router.delete('/:id',IngredientsController.delete)

module.exports = router