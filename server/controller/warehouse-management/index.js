const CancellationFormController = require('./cancellationForm.controller')
const ReasonCancellationController = require('./reasonCancellations.controller'); 
const IngredientsController = require('./ingredient.controller')
const ReceiptController = require('./receipt.controller')
const SupplierController = require('./supplier.controller')
const WarehouseController = require('./warehouse.controller')

module.exports = {
    CancellationFormController,
    ReasonCancellationController,
    IngredientsController,
    ReceiptController,
    SupplierController,
    WarehouseController
}