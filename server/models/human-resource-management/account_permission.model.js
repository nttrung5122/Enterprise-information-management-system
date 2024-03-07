const { DataTypes } = require("sequelize");
const sequelize = require("../config.database");

const AccountPermission = sequelize.define("account_permission", {
},{timestamps:false});

module.exports = AccountPermission;
