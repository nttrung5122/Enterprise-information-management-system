const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const SectionDetail = sequelize.define('section_detail', {
    id_food: {type:DataTypes.INTEGER,primaryKey:true},
    id_section: {type:DataTypes.INTEGER,primaryKey:true}
  });

module.exports = SectionDetail ;