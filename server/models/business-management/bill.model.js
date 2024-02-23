const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Bill = sequelize.define('bill', {
    total_price: DataTypes.INTEGER,
    is_done: DataTypes.BOOLEAN
  });

module.exports = Bill ;