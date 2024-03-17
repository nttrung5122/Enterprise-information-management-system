const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const SectionMenu = sequelize.define('section_menu', {
    nameSection: DataTypes.STRING,
    info: DataTypes.STRING
  },
  {
    timestamps:false,
  });

module.exports = SectionMenu ;