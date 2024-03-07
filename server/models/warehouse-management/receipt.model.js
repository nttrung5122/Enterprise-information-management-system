const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Receipt = sequelize.define('receipt', {
    priceTotal: DataTypes.INTEGER,
    dateOfReceipt: DataTypes.DATEONLY,
  } );

module.exports = Receipt;