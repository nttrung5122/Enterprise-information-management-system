const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const TimeKeeping = sequelize.define('time_keeping', {
    employeeId:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    date:{
      type: DataTypes.DATEONLY,
      primaryKey: true
    },
    haveWorking: DataTypes.BOOLEAN
  },{timestamps:false});

module.exports = TimeKeeping ;