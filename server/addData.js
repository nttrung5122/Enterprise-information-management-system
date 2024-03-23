require("dotenv").config();
const bcrypt = require("bcrypt");
const {
  sequelize,
} = require("./models");
const warhouseManagermentMockup = require("./mockup/warhouse-managerment.mockup");
const humanResourceManagermentMockup = require('./mockup/human-resourcce-management.mockup');



const addMockupData = async () => {

  await humanResourceManagermentMockup();

  await warhouseManagermentMockup();
  
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

