const router = require('express').Router(); 
const auth = require('./auth.route')
const humanResourceManagement = require('./human-resource-management')
const warehouseManagement = require('./warehouse-management')

router.use('/auth', auth);
router.use('/human-resource-management', humanResourceManagement);
router.use('/warehouse-management', warehouseManagement);

module.exports = router;