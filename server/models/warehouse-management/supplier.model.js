const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Supplier = sequelize.define('supplier', {
    nameSupplier: DataTypes.STRING,
    emailContact: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  } );

module.exports = Supplier;