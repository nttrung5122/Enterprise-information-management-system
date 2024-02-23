const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const CancellationFormDetail = sequelize.define('cancellation_form_detail', {
    id_cancellation_form: {type:DataTypes.INTEGER,primaryKey:true},
    id_ingredient: {type:DataTypes.INTEGER,primaryKey:true},
    quantity: DataTypes.INTEGER,
    id_reason: {type:DataTypes.INTEGER,primaryKey:true}
  });

module.exports = CancellationFormDetail ;