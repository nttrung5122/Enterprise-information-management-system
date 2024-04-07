const { DataTypes } = require("sequelize");
const sequelize = require("../config.database");

const Warehouse = sequelize.define("warehouse", {
  ingredientId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  quantity: DataTypes.FLOAT,
},
{
  timestamps:false,
} );

module.exports = Warehouse;
