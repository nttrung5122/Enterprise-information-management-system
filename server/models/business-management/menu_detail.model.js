const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const MenuDetail = sequelize.define('menu_detail', {
    id_menu: {type:DataTypes.INTEGER,primaryKey:true},
    id_section: {type:DataTypes.INTEGER,primaryKey:true}
  });

module.exports = MenuDetail ;