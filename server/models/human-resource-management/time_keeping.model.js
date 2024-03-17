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
    haveWorking:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },{timestamps:false});

module.exports = TimeKeeping ;