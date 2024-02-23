const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const RecipeDetail = sequelize.define('recipe_detail', {
    id_recipe:{type:DataTypes.INTEGER,primaryKey:true},
    id_ingredient: {type:DataTypes.INTEGER,primaryKey:true},
    quantity: DataTypes.INTEGER
  });

module.exports = RecipeDetail ;