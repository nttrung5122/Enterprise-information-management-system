const router = require('express').Router(); 

const {ReceiptController} = require('../../controller/warehouse-management')
// /warehouse-management/receipt

router.get('/',ReceiptController.getAll)
router.get('/:id',ReceiptController.get)
router.post('/',ReceiptController.create)

module.exports = router