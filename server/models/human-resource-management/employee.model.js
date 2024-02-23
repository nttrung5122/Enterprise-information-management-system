const { DataTypes } = require("sequelize");
const sequelize = require("../config.database");

const Employee = sequelize.define("employee", {
  fullname: DataTypes.STRING,
  email: DataTypes.STRING,
  phoneNumber: DataTypes.STRING,
  address: DataTypes.STRING,
  hireDate: DataTypes.DATE,
  isWorking: DataTypes.BOOLEAN,
});

module.exports = Employee;
