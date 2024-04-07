const router = require('express').Router();
const {BillController} = require('../../controller/business-management')

router.patch('/set-bill-done/:id', BillController.setBillDone)
router.get('/get-bill-no-done', BillController.getBillNotDone)
router.post('/', BillController.create)
router.get('/', BillController.getAll)
router.get('/:id', BillController.get)
router.patch('/:id',BillController.update)
module.exports = router;