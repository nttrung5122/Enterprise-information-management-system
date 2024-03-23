const { DataTypes } = require("sequelize");
const sequelize = require("../config.database");
const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const LeaveApplicationDetail = sequelize.define("leave_application_detail", {
  employeeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    primaryKey: true,
  },
  havePay: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
},{timestamps:false});

module.exports = LeaveApplicationDetail;
