const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const MenuDetail = sequelize.define('menu_detail', {
  },
  {
    timestamps:false,
  });

module.exports = MenuDetail ;