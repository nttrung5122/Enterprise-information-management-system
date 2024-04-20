const { LeaveApplicationController } = require('../../controller/human-resource-management');

const router = require('express').Router(); 

// /human-resource-management/leave-application
// router.post('/send-application', LeaveApplicationController.sendApplication)
// router.get('/new-application', LeaveApplicationController.getNewApplication)
// router.get('/my-application/:employeeId', LeaveApplicationController.getMyApplication)
// router.patch('/accept-application',LeaveApplicationController.acceptLeaveApplication)
// router.get('/:leaveApplicationId', LeaveApplicationController.getApplication) // chưa test
router.get('/statistics-in-month',LeaveApplicationController.statisticsInMonth )
router.get('/statistics-each-month',LeaveApplicationController.statisticsEachMonth )
router.get('/statistics-in-year',LeaveApplicationController.statisticsInYear )
router.get('/', LeaveApplicationController.getAllApplication)

module.exports = router