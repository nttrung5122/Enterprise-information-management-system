const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const Menu = sequelize.define('menu', {
    nameMenu: DataTypes.STRING,
    info: DataTypes.STRING
  });

module.exports = Menu ;