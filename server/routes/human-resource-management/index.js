const EmployeeRoutes = require('./employee.route')
const router = require('express').Router(); 

// /human-resource-management
router.use('/employee', EmployeeRoutes);

module.exports = router