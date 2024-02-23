const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const ReasonCancellation = sequelize.define('reason_cancellation', {
    info: DataTypes.STRING
  });

module.exports = ReasonCancellation ;