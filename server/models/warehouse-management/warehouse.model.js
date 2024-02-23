const { DataTypes } = require("sequelize");
const sequelize = require("../config.database");

const Warehouse = sequelize.define("warehouse", {
  ingredientId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  quantity: DataTypes.INTEGER,
});

module.exports = Warehouse;
