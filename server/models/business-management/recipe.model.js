const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Recipe = sequelize.define('recipe', {
    name_recipe: DataTypes.STRING
  });

module.exports = Recipe ;