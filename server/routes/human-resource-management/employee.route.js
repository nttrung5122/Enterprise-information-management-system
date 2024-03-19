const router = require('express').Router(); 
const {EmployeeController} = require('../../controller/human-resource-management')


// /human-resource-management/employee
router.post('/update-role',EmployeeController.updateRole)
router.post('/add-employee',EmployeeController.addEmployee)
router.patch('/change-info-employee',EmployeeController.changeInfoEmployee)
router.post('/delete-employee',EmployeeController.deleteEmployee)
router.post('/check-in-daily',EmployeeController.checkInDaily)
router.post('/timekeeping',EmployeeController.timekeeping)
router.get('/calculate-salary-all-in-month',EmployeeController.calculateSalaryAllEmployeeInMonth)
// router.get('/calculate-my-salary',EmployeeController.calculateMySalary)
router.get('/',EmployeeController.getAllEmployee)
router.get('/:id',EmployeeController.getById)


module.exports = router