const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Permission = sequelize.define('permissions', {
    info: DataTypes.STRING
  },{timestamps:false});

module.exports = Permission;