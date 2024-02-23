const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Role = sequelize.define('role', {
    baseSalary: DataTypes.INTEGER,
    info: DataTypes.STRING
  });

module.exports = Role;