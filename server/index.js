const express = require("express");
require("dotenv").config();
// const db = require("./models");
const {sequelize} = require("./models");

const app = express();
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
