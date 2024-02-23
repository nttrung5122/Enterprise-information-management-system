const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Permission = sequelize.define('permissions', {
    info: DataTypes.STRING
  });

module.exports = Permission;