const { DataTypes } = require('sequelize');
const sequelize = require('../config.database');

const CancellationForm = sequelize.define('cancellation_form', {
    info: DataTypes.STRING,
    date: DataTypes.DATEONLY
  },
  {
    timestamps:false,
  } );
  

module.exports = CancellationForm;