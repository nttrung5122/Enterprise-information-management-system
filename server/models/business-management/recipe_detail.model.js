const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const RecipeDetail = sequelize.define('recipe_detail', {
    quantity: DataTypes.INTEGER
  });

module.exports = RecipeDetail ;