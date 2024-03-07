const { DataTypes } = require("sequelize");
const sequelize = require("../config.database");

const Contract = sequelize.define("contract", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    primaryKey: true,
  },
  endDate: {
    type: DataTypes.DATEONLY
  },
  content: {
    type: DataTypes.STRING,
  },
},{timestamps:false});

module.exports = Contract;
