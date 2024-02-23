const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Warehouse = sequelize.define('warehouse', {
    id_ingredient: {type:DataTypes.INTEGER,primaryKey:true},
    quantity: DataTypes.INTEGER
  });

module.exports = Warehouse;