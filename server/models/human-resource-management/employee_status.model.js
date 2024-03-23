const { DataTypes } = require("sequelize");
const sequelize = require("../config.database");

const EmployeeStatus = sequelize.define(
  "employee_status",
  {
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
      set(value){
        const date = new Date(value);
        const m = date.getMonth();
        const y = date.getFullYear()
        this.setDataValue('startDate', new Date(y,m,1));
      }
    },
    endDate:{
      type: DataTypes.DATEONLY,
      defaultValue: null,
      set(value){
        const date = new Date(value);
        const m = date.getMonth();
        const y = date.getFullYear()
        this.setDataValue('endDate', new Date(y,m+1,0));
      }
    },
    salaryScale: { type: DataTypes.FLOAT, defaultValue: 1.0 },
  },
  { timestamps: false }
);

module.exports = EmployeeStatus;
