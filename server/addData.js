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
const employeeData = [
  {
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
const ingredientData = [
  {
    nameIngredient: "chicken",
    unitCal: "kg"
  },
  {
    nameIngredient: "rice",
    unitCal: "kg"
  },
  {
    nameIngredient: "pork",
    unitCal: "kg"
  }
]

const addMockupData = async () => {
   const employee = await Employee.bulkCreate(employeeData)
  await Account.bulkCreate(
    employee.map((employee) => {
      return { employeeId:employee.id, password: "123" };
    })
  );
  const ingredient = await Ingredient.bulkCreate(ingredientData);
  await Warehouse.bulkCreate(ingredient.map((ingredient) => {
    return {
      ingredientId: ingredient.id,
      quantity: 0,
    }
  }))
};

sequelize
  .authenticate()
  .then(async (response) => {
    console.log("connected to DB");
    await addMockupData();

    console.log("add data successfully");
  })
  .catch((err) => {
    console.log(err);
  });
