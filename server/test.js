const moment = require("moment");
const { Bill, Food, Recipe, Ingredient } = require("./models");



// const date  = moment('2010/10/20')
const month = "02";
const year = "2022";
const startOfMonth = moment(`${year}/01/01`).format('YYYY/MM/DD');
const endOfMonth = moment(`${year}/01/01`).endOf('year').format('YYYY/MM/DD');
console.log(startOfMonth);
console.log(endOfMonth);