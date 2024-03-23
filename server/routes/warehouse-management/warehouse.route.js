const { WarehouseController } = require('../../controller/warehouse-management');

const router = require('express').Router(); 

// /warehouse-management/warehouse
router.get('/statistic-by-month/:month/:year', WarehouseController.statisticByMonth)
router.get('/statistic-by-year/:year', WarehouseController.statisticByYear)
router.get('/',WarehouseController.getAll)
router.get('/:id',WarehouseController.get)
router.patch('/:id',WarehouseController.update)

module.exports = router