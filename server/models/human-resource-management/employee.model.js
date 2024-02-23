const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Employee = sequelize.define('employee', {
    id_account: DataTypes.INTEGER,
    hire_date: DataTypes.DATE,
    is_working: DataTypes.BOOLEAN
  });

module.exports = Employee ;