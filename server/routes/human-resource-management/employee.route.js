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
router.get('/calculate-salary-all-in-year',EmployeeController.getSalaryAllEmployeeInYear)
router.get('/calculate-my-salary',EmployeeController.calculateMySalary)
router.get('/calculate-my-salary-in-year',EmployeeController.getMySalaryInYear)
router.get('/statistic-my-salary-by-month',EmployeeController.statisticMySalaryByMonth)
router.get('/statistic-all-employee-salary-by-month',EmployeeController.statisticAllEmployeeSalaryByMonth)
router.get('/statistic-all-employee-salary-by-year',EmployeeController.statisticAllEmployeeSalaryByYear)
router.get('/statistic-my-salary-by-year',EmployeeController.statisticMySalaryByYear)
router.get('/:id',EmployeeController.getById)
router.get('/',EmployeeController.getAllEmployee)


module.exports = router