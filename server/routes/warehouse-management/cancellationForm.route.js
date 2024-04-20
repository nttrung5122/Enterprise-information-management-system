const {CancellationFormController }= require('../../controller/warehouse-management');

const router = require('express').Router(); 

// /warehouse-management/cancellation-form
router.get('/statistics-in-month',CancellationFormController.statisticsInMonth )
router.get('/statistics-each-month',CancellationFormController.statisticsEachMonth )
router.get('/statistics-in-year',CancellationFormController.statisticsInYear )
router.get('/',CancellationFormController.getAll)
router.get('/:id',CancellationFormController.get)
router.post('/',CancellationFormController.create)

module.exports = router