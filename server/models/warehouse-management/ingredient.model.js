const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Ingredient = sequelize.define('ingredient', {
    nameIngredient: DataTypes.INTEGER,
    unitCal: DataTypes.STRING
  });

module.exports = Ingredient;