const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const CancellationFormDetail = sequelize.define('cancellation_form_detail', {
    quantity: DataTypes.INTEGER,
    cancellationFormId:{type: DataTypes.INTEGER},
    ingredientId:{type: DataTypes.INTEGER}
  });

module.exports = CancellationFormDetail ;