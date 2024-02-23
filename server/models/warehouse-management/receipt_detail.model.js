const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const ReceiptDetail = sequelize.define('receipt_detail', {
    id_receipt: {type:DataTypes.INTEGER,primaryKey:true},
    id_ingredient: {type:DataTypes.INTEGER,primaryKey:true},
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    price_per_unit: DataTypes.INTEGER
  });
  

module.exports =ReceiptDetail ;