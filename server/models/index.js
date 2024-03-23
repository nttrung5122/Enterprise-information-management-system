const sequelize = require("./config.database");

const {
  AccountPermission,
  Account,
  EmployeeStatus,
  Employee,
  Permission,
  Role,
  TimeKeeping,
  Contract,
  LeaveApplication,
  LeaveApplicationDetail
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

Employee.hasOne(Account);
Account.belongsTo(Employee);

Employee.hasMany(Contract);
Contract.belongsTo(Employee);

TimeKeeping.belongsTo(Employee);
Employee.hasMany(TimeKeeping);

EmployeeStatus.belongsTo(Employee);
Employee.hasMany(EmployeeStatus);

EmployeeStatus.belongsTo(Role);
Role.hasMany(EmployeeStatus);

Employee.hasOne(LeaveApplication);
LeaveApplication.belongsTo(Employee);

LeaveApplicationDetail.belongsTo(Employee);
Employee.hasMany(LeaveApplicationDetail);

// Employee.belongsToMany(Role,{through:{
//   model:EmployeeStatus,
//   unique:false,
// },})
// Role.belongsToMany(Employee,{through:{
//   model:EmployeeStatus,
//   unique:false,
// }})

// AccountPermission.belongsTo(Account);
// AccountPermission.belongsTo(Permission);

Account.belongsToMany(Permission,{through: "account_permission"});
Permission.belongsToMany(Account,{through: "account_permission"});

Warehouse.belongsTo(Ingredient);
Ingredient.hasOne(Warehouse)


Receipt.belongsTo(Employee);
Employee.hasMany(Receipt);

Receipt.belongsTo(Supplier);
Supplier.hasMany(Receipt);

Receipt.belongsToMany(Ingredient,{through: "receipt_detail"})
Ingredient.belongsToMany(Receipt,{through: "receipt_detail"})

CancellationFormDetail.belongsTo(CancellationForm);
CancellationFormDetail.belongsTo(Ingredient);

CancellationForm.belongsToMany(Ingredient,{through: "cancellation_form_detail"})
Ingredient.belongsToMany(CancellationForm,{through: "cancellation_form_detail"})

CancellationForm.belongsTo(Employee);
Employee.hasMany(CancellationForm);


CancellationForm.belongsTo(ReasonCancellation);
ReasonCancellation.hasMany(CancellationForm)

Food.belongsTo(Recipe);
Recipe.hasMany(Food)

// RecipeDetail.belongsTo(Recipe);
// RecipeDetail.belongsTo(Ingredient);

Recipe.belongsToMany(Ingredient,{through:"recipe_detail"})
Ingredient.belongsToMany(Recipe,{through:"recipe_detail"})


// MenuDetail.belongsTo(Menu);
// MenuDetail.belongsTo(SectionMenu);

Menu.belongsToMany(SectionMenu,{through:"menu_detail"})
SectionMenu.belongsToMany(Menu,{through:"menu_detail"})


// SectionDetail.belongsTo(Food);
// SectionDetail.belongsTo(SectionMenu);

Food.belongsToMany(SectionMenu,{through:"section_detail"});
SectionMenu.belongsToMany(Food,{through:"section_detail"});

// BillDetail.belongsTo(Bill);
// BillDetail.belongsTo(Food);

Bill.belongsToMany(Food,{through:"bill_detail"})
Food.belongsToMany(Bill,{through:"bill_detail"})

Bill.belongsTo(Employee);
Employee.hasMany(Bill);

module.exports = {
  sequelize,
  AccountPermission,
  Account,
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
  Contract,
  LeaveApplication,
  LeaveApplicationDetail
};
