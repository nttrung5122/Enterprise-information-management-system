const router = require('express').Router(); 
const auth = require('./auth.route')
const humanResourceManagementRoutes = require('./human-resource-management')
const warehouseManagementRoutes = require('./warehouse-management')
const businessManagementRoutes = require('./business-management')
router.use('/auth', auth);
router.use('/human-resource-management', humanResourceManagementRoutes);
router.use('/warehouse-management', warehouseManagementRoutes);
router.use('/business-management', businessManagementRoutes);


module.exports = router;