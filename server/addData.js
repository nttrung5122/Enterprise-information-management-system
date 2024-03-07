require("dotenv").config();
const bcrypt = require("bcrypt");
const {
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
} = require("./models");

const addMockupData = async ()=>{
  const employeeData = [
    {
      id:4001,
      fullname: "Nguyễn Văn A",
      email: "<EMAIL>",
      phoneNumber: "123456789",
      address: "abc",
    },
    {
      fullname: "abc234",
      email: "<EMAIL>",
      phoneNumber: "123456789",
      address: "abc",
    },
    {
      fullname: "abc123",
      email: "<EMAIL>",
      phoneNumber: "123456789",
      address: "abc",
    },
  ];

  await  Account.bulkCreate(
    employee.map((employee) => {
      return {  ...employee, password: "123" };
    })
  );
}

sequelize
  .authenticate()
  .then(async (response) => {
    console.log("connected to DB");
    await addData()
    
    await addMockupData();

    console.log("add data successfully");
  })
  .catch((err) => {
    console.log(err);
  });
