const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const BillDetail = sequelize.define('bill_detail', {
    id_bill: {type:DataTypes.INTEGER,primaryKey:true},
    id_food: {type:DataTypes.INTEGER,primaryKey:true},
    quantity: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER
  });

module.exports = BillDetail ;

