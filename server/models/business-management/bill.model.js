const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Bill = sequelize.define('bill', {
    totalPrice: DataTypes.INTEGER,
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    date: DataTypes.DATE
  },
  {
    timestamps:false,
  });

module.exports = Bill ;