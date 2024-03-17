const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const ReasonCancellation = sequelize.define('reason_cancellation', {
    name: DataTypes.STRING,
    detail: DataTypes.STRING
  },
  {
    timestamps:false,
  } );

module.exports = ReasonCancellation ;