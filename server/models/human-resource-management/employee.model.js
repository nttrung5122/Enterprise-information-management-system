const { DataTypes } = require("sequelize");
const sequelize = require("../config.database");

const Employee = sequelize.define(
  "employee",
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    hireDate: DataTypes.DATEONLY,
    isWorking: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { timestamps: false }
);

module.exports = Employee;
