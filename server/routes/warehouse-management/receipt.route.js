const router = require('express').Router(); 

const {ReceiptController} = require('../../controller/warehouse-management')
// /warehouse-management/receipt

router.get('/statistics-in-month',ReceiptController.statisticsInMonth )
router.get('/statistics-each-month',ReceiptController.statisticsEachMonth )
router.get('/statistics-in-year',ReceiptController.statisticsInYear )
router.get('/',ReceiptController.getAll)
router.get('/:id',ReceiptController.get)
router.post('/',ReceiptController.create)
module.exports = router