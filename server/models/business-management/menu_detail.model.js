const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const MenuDetail = sequelize.define('menu_detail', {
  });

module.exports = MenuDetail ;