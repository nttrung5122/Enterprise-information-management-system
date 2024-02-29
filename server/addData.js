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

  const addData = async ()=>{

    await Employee.create({
      id: 99999,
      fullname: "admin",
    })

    const admin = await Account.create({
        id: 999,
        password: "admin",
        employeeId: 99999
      })

    const adminPermission = await Permission.create({
      id: 9999,
      info: "admin",
    })

    await AccountPermission.create({
      accountId: 999,
      permissionId: 9999,
    })

  }

  sequelize.authenticate().then(async (response)=>{
    console.log("connected to DB")
    await addData();

    console.log('add data successfully')
  }).catch((err) => {
      console.log(err);
  })

  
