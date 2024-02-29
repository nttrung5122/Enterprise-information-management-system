const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');
const bcrypt = require("bcrypt");

const Account = sequelize.define('account', {
    password:{ 
      type:DataTypes.STRING,
      set(value){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync("admin", salt);
        this.setDataValue('password', hash);
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  

module.exports =  Account;