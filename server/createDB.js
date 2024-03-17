require("dotenv").config();

const {
  sequelize,
  Employee,
  Account,
  Permission,
  AccountPermission,
  Role,
  EmployeeStatus,
} = require("./models");

const {
  ADMIN_PERMISSION,
  BUSINESS_MANAGE_PERMISSION,
  USER_MANAGE_PERMISSION,
  WAREHOUSE_MANAGE_PERMISSION,
} = require("./constants/permission.const");

const permission = [
  {
    id: ADMIN_PERMISSION,
    info: "admin",
  },
  {
    id: BUSINESS_MANAGE_PERMISSION,
    info: "business management",
  },
  {
    id: USER_MANAGE_PERMISSION,
    info: "user management",
  },
  {
    id: WAREHOUSE_MANAGE_PERMISSION,
    info: "Warehouse management ",
  },
];

const role = [
  {
    id: 201,
    info: "CEO",
    baseSalary: 50000,
  },
  {
    id: 202,
    info: "HR",
    baseSalary: 30000,
  },
  {
    id: 203,
    info: "Staff",
    baseSalary: 10000,
  },
  {
    id: 204,
    info: "Manager",
    baseSalary: 20000,
  },
  {
    id: 205,
    info: "Warehouse manager",
    baseSalary: 40000,
  },
];

const addData = async () => {
  await Employee.create({
    id: 100,
    fullname: "admin",
    idCode: "32124124124"
  });
  await Employee.create({
    id: 101,
    fullname: "Nguyễn văn A",
    idCode: "32124124125"
  });

  await Account.create({
    id: 100,
    password: "admin",
    employeeId: 100,
  });
  await Account.create({
    id: 101,
    password: "admin",
    employeeId: 101,
  });


  await Permission.bulkCreate(permission);
  await Role.bulkCreate(role);
  await AccountPermission.create({
    accountId: 100,
    permissionId: 101,
  });
  await EmployeeStatus.create({
    employeeId: 100,
    roleId: 201,
    startDate: Date.now(),
    salaryScale: 1.2,
  });
  await EmployeeStatus.create({
    employeeId: 101,
    roleId: 203,
    startDate: Date.now(),
    salaryScale: 1.2,
  });
};

// Sync all defined models to the database
sequelize.sync({ force: true }).then(async () => {
  console.log("Drop and re-sync db.");
  await addData();
  console.log("add data successfully");
});
