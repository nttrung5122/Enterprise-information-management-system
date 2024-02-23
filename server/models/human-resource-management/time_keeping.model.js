const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const TimeKeeping = sequelize.define('time_keeping', {
    date:{
      type: DataTypes.DATE,
      primaryKey: true
    },
    haveWorking: DataTypes.BOOLEAN
  });

module.exports = TimeKeeping ;