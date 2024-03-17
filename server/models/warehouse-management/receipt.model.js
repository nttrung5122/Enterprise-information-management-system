const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Receipt = sequelize.define('receipt', {
    priceTotal: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
  },
  {
    timestamps:false,
  } );

module.exports = Receipt;