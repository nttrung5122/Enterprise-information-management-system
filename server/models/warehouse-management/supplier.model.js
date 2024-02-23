const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Supplier = sequelize.define('supplier', {
    name_supplier: DataTypes.STRING,
    email_contact: DataTypes.STRING,
    phone_number: DataTypes.STRING
  });

module.exports = Supplier;