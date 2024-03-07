const router = require('express').Router(); 
const {EmployeeController} = require('../../controller/human-resource-management')


// /human-resource-management/employee
router.post('/update-role',EmployeeController.updateRole)
router.post('/add-employee',EmployeeController.addEmployee)
router.patch('/change-info-employee',EmployeeController.changeInfoEmployee)
router.post('/delete-employee',EmployeeController.deleteEmployee)
router.get('/',EmployeeController.getAllEmployee)


module.exports = router