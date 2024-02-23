const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Ingredient = sequelize.define('ingredient', {
    name_ingredient: DataTypes.INTEGER,
    unit_cal: DataTypes.STRING
  });

module.exports = Ingredient;