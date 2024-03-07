const { DataTypes } = require("sequelize");
const sequelize = require("../config.database");

const EmployeeStatus = sequelize.define("employee_status", {
  employeeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    primaryKey: true,
  },
  endDate: DataTypes.DATEONLY,
  salaryScale: DataTypes.FLOAT,
},{timestamps:false});

module.exports = EmployeeStatus;
