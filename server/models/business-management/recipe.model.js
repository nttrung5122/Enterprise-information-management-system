const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Recipe = sequelize.define('recipe', {
    nameRecipe: DataTypes.STRING
  },
  {
    timestamps:false,
  });

module.exports = Recipe ;