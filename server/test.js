const moment = require("moment");
const { Bill, Food, Recipe, Ingredient } = require("./models");



// const date  = moment('2010/10/20')

const bill =  Bill.findAll({
    include: {
        model: Food,
        include: {
          model: Recipe,
          include: [Ingredient]
        }
    }})

bill.then((res)=>{
   console.log( res[0].food[0].recipe.ingredients[0].toJSON())
})