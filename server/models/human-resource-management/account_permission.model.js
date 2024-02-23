const { DataTypes } = require("sequelize");
const sequelize = require("../config.database");

const AccountPermission = sequelize.define("account_permission", {
  id_account: { type: DataTypes.INTEGER, primaryKey: true },
  id_permission: { type: DataTypes.INTEGER, primaryKey: true },
});

module.exports = AccountPermission;
