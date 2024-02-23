const { DataTypes } = require("sequelize");
const sequelize = require("../config.database");

const EmployeeStatus = sequelize.define(
  "employee_status",
  {
    id_employee: { type: DataTypes.INTEGER, primaryKey: true },
    id_role: { type: DataTypes.INTEGER, primaryKey: true },
    start_date: { type: DataTypes.DATE, primaryKey: true },
    end_date: DataTypes.DATE,
    salary: DataTypes.INTEGER,
  }
);

module.exports = EmployeeStatus;
