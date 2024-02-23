const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Food = sequelize.define('food', {
    id_recipe: DataTypes.INTEGER,
    name_food: DataTypes.STRING,
    info: DataTypes.STRING,
    price: DataTypes.INTEGER
  });

module.exports = Food ;