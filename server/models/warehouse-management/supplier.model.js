const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Supplier = sequelize.define('supplier', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  },
  {
    timestamps:false,
  } );

module.exports = Supplier;