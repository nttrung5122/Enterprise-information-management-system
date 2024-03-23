const router = require('express').Router(); 
const EmployeeRoutes = require('./employee.route')
const RoleRoutes = require('./role.route')
const ContractRoutes = require('./contract.route')
const AccountRoutes = require('./account.route')
const LeaveApplicationRoutes = require('./leave_application.route')
// /human-resource-management
router.use('/employee', EmployeeRoutes);
router.use('/role', RoleRoutes);
router.use('/contract', ContractRoutes);
router.use('/account', AccountRoutes);
router.use('/leave-application',LeaveApplicationRoutes);
module.exports = router