const { DataTypes } = require("sequelize");
const sequelize = require("../config.database");

const Ingredient = sequelize.define(
  "ingredient",
  {
    nameIngredient: DataTypes.STRING,
    unitCal: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

module.exports = Ingredient;
