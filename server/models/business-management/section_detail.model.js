const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const SectionDetail = sequelize.define('section_detail', {
  },
  {
    timestamps:false,
  });

module.exports = SectionDetail ;