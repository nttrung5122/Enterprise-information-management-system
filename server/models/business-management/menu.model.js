const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Menu = sequelize.define('menu', {
    name_menu: DataTypes.STRING,
    info: DataTypes.STRING
  });

module.exports = Menu ;