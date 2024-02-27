const express = require("express");
const session = require('express-session')
require("dotenv").config();
// const db = require("./models");
const {sequelize} = require("./models");
const routes = require('./routes/')
const app = express();
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.authenticate().then((response)=>{
  console.log("connected to DB")
}).catch((err) => {
    console.log(err);
})

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.use(routes);


const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
