const { DataTypes } = require("sequelize");
const sequelize = require("../config.database");
const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const LeaveApplication = sequelize.define("leave_application", {
  employeeId: {
    type: DataTypes.INTEGER,
  },
  startDate: {
    type: DataTypes.DATEONLY,
  },
  numberOfDaysOff:{
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  reason:{
    type: DataTypes.STRING
  },
  isApprove:{
    type: DataTypes.BOOLEAN,
    defaultValue: null,
  },
  numberOfDaysAllowed:{
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
},{timestamps:false});

module.exports = LeaveApplication;
