const sequelize = require("./config.database");

const {
  AccountPermission,
  Account,
  EmployeeInfo,
  EmployeeStatus,
  Employee,
  Permission,
  Role,
  TimeKeeping,
} = require("./human-resource-management");

const {
  CancellationFormDetail,
  CancellationForm,
  Ingredient,
  ReasonCancellation,
  ReceiptDetail,
  Receipt,
  Supplier,
  Warehouse,
} = require("./warehouse-management");

const {
  BillDetail,
  Bill,
  Food,
  MenuDetail,
  Menu,
  RecipeDetail,
  Recipe,
  SectionDetail,
  SectionMenu,
} = require("./business-management");

Employee.belongsTo(Account, { foreignKey: "id_account" });
Account.hasOne(Employee);

EmployeeInfo.belongsTo(Employee, { foreignKey: "id_employee" });
Employee.hasOne(Employee);

TimeKeeping.belongsTo(Employee, { foreignKey: "id_employee" });
Employee.hasMany(TimeKeeping);

EmployeeStatus.belongsTo(Employee, { foreignKey: "id_employee" });
EmployeeStatus.belongsTo(Role, { foreignKey: "id_role" });
AccountPermission.belongsTo(Account, { foreignKey: "id_account" });
AccountPermission.belongsTo(Permission, { foreignKey: "id_permission" });
Warehouse.belongsTo(Ingredient, { foreignKey: "id_ingredient" });
Receipt.belongsTo(Employee, { foreignKey: "creator" });
Receipt.belongsTo(Supplier, { foreignKey: "id_supplier" });
ReceiptDetail.belongsTo(Receipt, { foreignKey: "id_receipt" });
ReceiptDetail.belongsTo(Ingredient, { foreignKey: "id_ingredient" });
CancellationFormDetail.belongsTo(CancellationForm, {
  foreignKey: "id_cancellation_form",
});
CancellationFormDetail.belongsTo(Ingredient, { foreignKey: "id_ingredient" });
CancellationForm.belongsTo(ReasonCancellation, { foreignKey: "id_reason" });
Food.belongsTo(Recipe, { foreignKey: "id_recipe" });
RecipeDetail.belongsTo(Recipe, { foreignKey: "id_recipe" });
RecipeDetail.belongsTo(Ingredient, { foreignKey: "id_ingredient" });
MenuDetail.belongsTo(Menu, { foreignKey: "id_menu" });
MenuDetail.belongsTo(SectionMenu, { foreignKey: "id_section" });
SectionDetail.belongsTo(Food, { foreignKey: "id_food" });
SectionDetail.belongsTo(SectionMenu, { foreignKey: "id_section" });
BillDetail.belongsTo(Bill, { foreignKey: "id_bill" });
BillDetail.belongsTo(Food, { foreignKey: "id_food" });

module.exports = {
  sequelize,
  AccountPermission,
  Account,
  EmployeeInfo,
  EmployeeStatus,
  Employee,
  Permission,
  Role,
  TimeKeeping,
  CancellationFormDetail,
  CancellationForm,
  Ingredient,
  ReasonCancellation,
  ReceiptDetail,
  Receipt,
  Supplier,
  Warehouse,
  BillDetail,
  Bill,
  Food,
  MenuDetail,
  Menu,
  RecipeDetail,
  Recipe,
  SectionDetail,
  SectionMenu,
};
