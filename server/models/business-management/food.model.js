const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Food = sequelize.define('food', {
    nameFood: DataTypes.STRING,
    info: DataTypes.STRING,
    price: DataTypes.INTEGER,
    disable:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  },
  {
    timestamps:false,
  });

module.exports = Food ;