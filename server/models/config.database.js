const { Sequelize } = require("sequelize");

const username = process.env.usernameDB;
const password = process.env.passwd;
const database = process.env.database;
console.log({
  username,
  password,
  database,
})
const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
});
sequelize.afterDefine((model)=>{
  
})

module.exports = sequelize;
