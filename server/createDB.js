
require("dotenv").config();


const {
  sequelize,
} = require("./models");


// Sync all defined models to the database
sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

