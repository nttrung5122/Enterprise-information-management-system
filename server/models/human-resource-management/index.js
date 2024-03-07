const AccountPermission = require('./account_permission.model')
const Account = require('./account.model')
const EmployeeStatus = require('./employee_status.model')
const Employee = require('./employee.model');
const Permission = require('./permission.model');
const Role = require('./role.model')
const TimeKeeping = require('./time_keeping.model')
const Contract = require('./contract.model')
module.exports = {
    AccountPermission,
    Account,
    Employee,
    EmployeeStatus,
    Permission,
    Role,
    TimeKeeping,
    Contract
}