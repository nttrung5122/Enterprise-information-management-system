const { Sequelize } = require("sequelize");

const username = process.env.usernameDB||"root";
const password = process.env.passwd;
const database = process.env.database||"123";
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
