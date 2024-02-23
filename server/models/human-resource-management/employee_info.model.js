const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const EmployeeInfo = sequelize.define('employee_info', {
    id_employee:{type: DataTypes.INTEGER,primaryKey: true},
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING
  });

module.exports = EmployeeInfo ;