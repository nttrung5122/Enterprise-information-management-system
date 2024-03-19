const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const BillDetail = sequelize.define('bill_detail', {
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  },
  {
    timestamps:false,
  });

module.exports = BillDetail ;

