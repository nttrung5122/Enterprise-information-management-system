const { DataTypes } = require("sequelize");
const sequelize = require("../config.database");

const EmployeeStatus = sequelize.define("employee_status", {
  startDate: {
    type: DataTypes.DATE,
    primaryKey: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  endDate: DataTypes.DATE,
  salary: DataTypes.INTEGER,
});

module.exports = EmployeeStatus;
