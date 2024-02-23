const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const TimeKeeping = sequelize.define('time_keeping', {
    id_employee: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    date:{
      type: DataTypes.DATE,
      primaryKey: true
    },
    have_working: DataTypes.BOOLEAN
  });

module.exports = TimeKeeping ;