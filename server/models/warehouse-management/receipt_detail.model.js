const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const ReceiptDetail = sequelize.define('receipt_detail', {
    quantity: DataTypes.FLOAT,
    price: DataTypes.INTEGER,
    pricePerUnit: DataTypes.INTEGER
  },
  {
    timestamps:false,
  } );
  

module.exports =ReceiptDetail ;