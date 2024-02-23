const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Account = sequelize.define('account', {
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
  

module.exports =  Account;