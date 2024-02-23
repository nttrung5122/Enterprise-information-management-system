const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Receipt = sequelize.define('receipt', {
    id_supplier: DataTypes.INTEGER,
    price_total: DataTypes.INTEGER,
    date_of_receipt: DataTypes.DATE
  });

module.exports = Receipt;