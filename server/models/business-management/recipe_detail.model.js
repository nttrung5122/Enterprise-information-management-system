const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const RecipeDetail = sequelize.define('recipe_detail', {
    quantity: DataTypes.FLOAT
  },
  {
    timestamps:false,
  });

module.exports = RecipeDetail ;