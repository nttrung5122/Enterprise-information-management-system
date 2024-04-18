const router = require('express').Router();
// /warehouse-management
const cancellationForm = require('./cancellationForm.route')
const ingredient = require('./ingredient.route')
// const reasonCancellations = require('./reasonCancellations.route')
const receipt = require('./receipt.route')
const supplier = require('./supplier.route')
const warehouse = require('./warehouse.route')

router.use('/cancellation-form',cancellationForm)
router.use('/ingredient',ingredient)
// router.use('/reason-cancellation',reasonCancellations)
router.use('/receipt',receipt)
router.use('/supplier',supplier)
router.use('/warehouse',warehouse)

module.exports = router