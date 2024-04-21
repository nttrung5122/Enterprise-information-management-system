const { Op, Model } = require("sequelize");
const moment = require("moment");
const { Bill, Food, Recipe, Ingredient } = require("../../models");
const { ReceiptController } = require("../warehouse-management/");

const StatisticController = {
  calRevenueAllDayInMonth: async (year, month) => {
    const startOfMonth = moment(`${year}/${month}/01`).format("YYYY/MM/DD");
    const endOfMonth = moment(`${year}/${month}/01`)
      .endOf("month")
      .format("YYYY/MM/DD");
    const bills = await Bill.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });
    const dataStatistics = {};
    bills.forEach((bill) => {
      if (!dataStatistics[moment(bill.date).format("YYYY/MM/DD")]) {
        dataStatistics[moment(bill.date).format("YYYY/MM/DD")] = 0;
      }
      dataStatistics[moment(bill.date).format("YYYY/MM/DD")] += bill.totalPrice;
    });

    return dataStatistics;
  },
  calRevenueInMonth: async (year, month) => {
    const startOfMonth = moment(`${year}/${month}/01`).format("YYYY/MM/DD");
    const endOfMonth = moment(`${year}/${month}/01`)
      .endOf("month")
      .format("YYYY/MM/DD");
    const bills = await Bill.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });
    const dataStatistics = {
      totalPrice: 0,
      month,
    };
    bills.forEach((bill) => {
      dataStatistics.totalPrice += bill.totalPrice;
    });

    return dataStatistics;
  },
  statisticsRevenueDayInMonth: async (req, res) => {
    try {
      const month = req.query?.month;
      const year = req.query?.year;
      if (!month || !year) {
        return res.status(403).json("Data is invalid");
      }
      const data = await StatisticController.calRevenueAllDayInMonth(
        year,
        month
      );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticsRevenueAllMonthInYear: async (req, res) => {
    try {
      const year = req.query?.year;
      if (!year) {
        return res.status(403).json("Data is invalid");
      }
      const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
      const data = await Promise.all(
        monthArr.map((month) => {
          return StatisticController.calRevenueInMonth(year, month);
        })
      );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticsRevenueAllDayInYear: async (req, res) => {
    try {
      const year = req.query?.year;
      if (!year) {
        return res.status(403).json("Data is invalid");
      }
      const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
      const data = await Promise.all(
        monthArr.map((month) => {
          return StatisticController.calRevenueAllDayInMonth(year, month);
        })
      );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  calProfitInMonth: async (year, month) => {
    const [ingredientCost, revenue] = await Promise.all([
      ReceiptController.calInMonth(year, month),
      StatisticController.calRevenueInMonth(year, month),
    ]);
    const totalIngredientCost = Array.from(
      new Map(Object.entries(ingredientCost)).values()
    ).reduce((preValue,cur) => {
      return preValue + cur.totalPrice
    }, 0);
    const dataStatistics = {
      totalIngredientCost,
      revenue: revenue.totalPrice,
      profit: revenue.totalPrice - totalIngredientCost,
      month,
    };
    return dataStatistics;
  },
  calProfitInYear: async (year) => {
    const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
    const [ingredientCost, revenue] = await Promise.all([
      ReceiptController.calInYear(year),
      Promise.all(monthArr.map((month) => {
        return StatisticController.calRevenueInMonth(year, month);
      })),
    ]);
    const totalIngredientCost = Array.from(
      new Map(Object.entries(ingredientCost)).values()
    ).reduce((preValue,cur) => {
      return preValue + cur.totalPrice
    }, 0);
    const totalRevenue = revenue.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.totalPrice
    }, 0);
    const dataStatistics = {
      totalIngredientCost,
      totalRevenue,
      profit: totalRevenue - totalIngredientCost,
    };
    return dataStatistics;
  },
  statisticsProfitInMonth: async (req, res) => {
    try {
      const month = req.query?.month;
      const year = req.query?.year;
      if (!month || !year) {
        return res.status(403).json("Data is invalid");
      }
      const data = await StatisticController.calProfitInMonth(year, month);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticsProfitInYear: async (req, res) => {
    try {
      const year = req.query?.year;
      if (!year) {
        return res.status(403).json("Data is invalid");
      }
      const data = await StatisticController.calProfitInYear(year);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticsProfitAllMonthInYear: async (req, res) => {
    try {
      const year= req.query?.year;
      if(!year){
        return res.status(403).json("Data is invalid");
      }
      const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
      const data = await Promise.all(monthArr.map((month)=>{
        return StatisticController.calProfitInMonth(year,month)
      }))
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  calFoodSoldInMonth: async (year, month) => {
    const startOfMonth = moment(`${year}/${month}/01`).format("YYYY/MM/DD");
    const endOfMonth = moment(`${year}/${month}/01`)
      .endOf("month")
      .format("YYYY/MM/DD");
    const bills = await Bill.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      include:[Food]
    });
    const dataStatistics = {
      month,
      detail: {}
    };
    bills.forEach((bill) => {
      bill.food.forEach((food) =>{
        if(!dataStatistics.detail[food.id]){
          dataStatistics.detail[food.id] = {
            foodId: food.id,
            nameFood: food.nameFood,
            info: food.info,
            quantity: 0
          }
        }
        dataStatistics.detail[food.id].quantity += food.bill_detail.quantity;
      })
    });

    return dataStatistics
  },
  calFoodSoldAllDayInMonth: async (year, month) => {
    const startOfMonth = moment(`${year}/${month}/01`).format("YYYY/MM/DD");
    const endOfMonth = moment(`${year}/${month}/01`)
      .endOf("month")
      .format("YYYY/MM/DD");
    const bills = await Bill.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      include:[Food]
    });
    const dataStatistics = {};
    bills.forEach((bill) => {
      if (!dataStatistics[moment(bill.date).format("YYYY/MM/DD")]) {
        dataStatistics[moment(bill.date).format("YYYY/MM/DD")] = {};
      }
      bill.food.forEach((food) =>{
        if(!dataStatistics[moment(bill.date).format("YYYY/MM/DD")][food.id]){
          dataStatistics[moment(bill.date).format("YYYY/MM/DD")][food.id] = {
            foodId: food.id,
            nameFood: food.nameFood,
            info: food.info,
            quantity: 0
          }
        }
        dataStatistics[moment(bill.date).format("YYYY/MM/DD")][food.id].quantity += food.bill_detail.quantity;
      })
    });

    return dataStatistics
  },
  statisticsFoodSoldAllDayInMonth: async (req, res) => {
    try {
       const month= req.query?.month;
      const year= req.query?.year;
      if(!month || !year){
        return res.status(403).json("Data is invalid");
      }
      const data = await StatisticController.calFoodSoldAllDayInMonth(year,month);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticsFoodSoldAllDayInYear: async (req, res) => {
    try {
      const year= req.query?.year;
      if(!year){
        return res.status(403).json("Data is invalid");
      }
      const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
      const data = await Promise.all(monthArr.map((month)=>{
        return StatisticController.calFoodSoldAllDayInMonth(year,month)
      }))
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticsFoodSoldAllMonthInYear: async (req, res) => {
    try {
      const year= req.query?.year;
      if(!year){
        return res.status(403).json("Data is invalid");
      }
      const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
      const data = await Promise.all(monthArr.map((month)=>{
        return StatisticController.calFoodSoldInMonth(year,month)
      }))
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  calIngredientsConsumedAllDayInMonth: async (year, month) => {
    const startOfMonth = moment(`${year}/${month}/01`).format("YYYY/MM/DD");
    const endOfMonth = moment(`${year}/${month}/01`)
      .endOf("month")
      .format("YYYY/MM/DD");
    const bills = await Bill.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      include:{
        model: Food,
        include: {
          model: Recipe,
          include: {
            model: Ingredient,
          },
        },
      }
    });
    const dataStatistics = {};
    bills.forEach((bill) => {
      if (!dataStatistics[moment(bill.date).format("YYYY/MM/DD")]) {
        dataStatistics[moment(bill.date).format("YYYY/MM/DD")] = {};
      }
      bill.food.forEach((food) =>{
        food.recipe.ingredients.forEach((ingredients)=>{
          if (!dataStatistics[moment(bill.date).format("YYYY/MM/DD")][ingredients.id]) {
            dataStatistics[moment(bill.date).format("YYYY/MM/DD")][ingredients.id] = {
              ingredientId: ingredients.id,
              nameIngredient: ingredients.nameIngredient,
              quantity: 0
            };
          }
          dataStatistics[moment(bill.date).format("YYYY/MM/DD")][ingredients.id].quantity += ingredients.recipe_detail.quantity;
          // dataStatistics[moment(bill.date).format("YYYY/MM/DD")][ingredients.id].quantity = Number(dataStatistics[moment(bill.date).format("YYYY/MM/DD")][ingredients.id].quantity.toFixed(2))
        })
      })
    });

    return dataStatistics
  },
  calIngredientsConsumedInMonth: async (year, month) => {
    const startOfMonth = moment(`${year}/${month}/01`).format("YYYY/MM/DD");
    const endOfMonth = moment(`${year}/${month}/01`)
      .endOf("month")
      .format("YYYY/MM/DD");
    const bills = await Bill.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      include:{
        model: Food,
        include: {
          model: Recipe,
          include: {
            model: Ingredient,
          },
        },
      }
    });
    const dataStatistics = {
      month,
      detail: {}
    };
    bills.forEach((bill) => {
      bill.food.forEach((food) =>{
        food.recipe.ingredients.forEach((ingredients)=>{
          if (!dataStatistics.detail[ingredients.id]) {
            dataStatistics.detail[ingredients.id] = {
              ingredientId: ingredients.id,
              nameIngredient: ingredients.nameIngredient,
              quantity: 0
            };
          }
          dataStatistics.detail[ingredients.id].quantity += ingredients.recipe_detail.quantity;
          // dataStatistics.detail[ingredients.id].quantity = Number(dataStatistics.detail[ingredients.id].quantity.toFixed(2))
        })
      })
    });

    return dataStatistics
  },
  statisticsIngredientsConsumedInMonth: async (req, res) => {
    try {
      const month= req.query?.month;
      const year= req.query?.year;
      if(!month || !year){
        return res.status(403).json("Data is invalid");
      }
      const data = await StatisticController.calIngredientsConsumedAllDayInMonth(year,month);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticsIngredientsConsumedAllDayInYear: async (req, res) => {
    try {
      const year= req.query?.year;
      if(!year){
        return res.status(403).json("Data is invalid");
      }
      const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
      const data = await Promise.all(monthArr.map((month)=>{
        return StatisticController.calIngredientsConsumedAllDayInMonth(year,month)
      }))
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticsIngredientsConsumedAllMonthOfYear: async (req, res) => {
    try {
      const year= req.query?.year;
      if(!year){
        return res.status(403).json("Data is invalid");
      }
      const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
      const data = await Promise.all(monthArr.map((month)=>{
        return StatisticController.calIngredientsConsumedInMonth(year,month)
      }))
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = StatisticController;
