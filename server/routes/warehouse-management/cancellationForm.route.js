const {CancellationFormController }= require('../../controller/warehouse-management');

const router = require('express').Router(); 

// /warehouse-management/cancellation-form

router.get('/',CancellationFormController.getAll)
router.get('/:id',CancellationFormController.get)
router.post('/',CancellationFormController.create)

module.exports = router