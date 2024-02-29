const router = require('express').Router(); 
const {EmployeeController} = require('../../controller/human-resource-management')


// /human-resource-management/employee
router.get('/',EmployeeController.getAllEmployee)

module.exports = router