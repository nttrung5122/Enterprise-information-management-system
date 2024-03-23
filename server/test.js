const moment = require("moment");

// const date  = moment('2010/10/20')
const date = moment({y:2024,M:3,day:3})
const lastDay = moment({
    y: 2023,
    M: 1,
  }).endOf('year');
const firstDay = moment({
    y: 2023,
    M: 1,
  }).startOf('year'); 
console.log(firstDay)
console.log(lastDay)