const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const SectionMenu = sequelize.define('section_menu', {
    name_section: DataTypes.STRING,
    info: DataTypes.STRING
  });

module.exports = SectionMenu ;