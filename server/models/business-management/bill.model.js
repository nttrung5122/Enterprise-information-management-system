const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Bill = sequelize.define('bill', {
    totalPrice: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN,
    date: DataTypes.DATE
  },
  {
    timestamps:false,
  });

module.exports = Bill ;