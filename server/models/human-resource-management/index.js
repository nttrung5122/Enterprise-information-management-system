const AccountPermission = require('./account_permission.model')
const Account = require('./account.model')
const EmployeeInfo = require('./employee_info.model')
const EmployeeStatus = require('./employee_status.model')
const Employee = require('./employee.model');
const Permission = require('./permission.model');
const Role = require('./role.model')
const TimeKeeping = require('./time_keeping.model')

module.exports = {
    AccountPermission,
    Account,
    Employee,
    EmployeeInfo,
    EmployeeStatus,
    Permission,
    Role,
    TimeKeeping
}