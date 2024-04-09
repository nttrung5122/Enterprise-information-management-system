const {
  sequelize,
  Bill,
  BillDetail,
  Food,
  Recipe,
  Ingredient,
  Warehouse,
} = require("../../models");
const moment = require("moment");

const BillController = {
  create: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const employeeId = req.body?.employeeId;
      const totalPrice = req.body?.totalPrice;
      const detail = req.body?.detail;
      // [
      //     {
      //     totalPrice,
      //     quantiity,
      //     foodId
      //     }
      // ]
      if (!employeeId || !totalPrice || !detail)
      {
        await t.rollback();
        return res.status(400).json("Data is invalid");
      }
      const date = moment().format("YYYY-MM-DD");
      const newBill = await Bill.create(
        {
          employeeId,
          totalPrice,
          date,
        },
        {
          transaction: t,
        }
      );

      const billDetail = await BillDetail.bulkCreate(
        detail.map((item) => {
          return {
            ...item,
            billId: newBill.id,
          };
        }),
        {
          transaction: t,
        }
      );
      await t.commit();
      const bill = await Bill.findByPk(newBill.id);
      res.status(200).json(bill);
    } catch (error) {
      await t.rollback();
      console.log(error);
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const billId = req.params.id;
      const detail = req.body?.detail;
      const employeeId = req.body?.employeeId;
      const totalPrice = req.body?.totalPrice;
      if ((!detail || detail.length == 0) && !employeeId && !totalPrice) {
        await t.rollback();
        return res.status(400).json("Data is invalid");
      }
      // [
      //     {
      //     totalPrice,
      //     quantiity,
      //     foodId
      //     }
      // ]
      const bill = await Bill.findByPk(billId);
      if (!bill){
        await t.rollback();
        return res.status(400).json("bill not found");
      } 
      await bill.update({
        employeeId,
        totalPrice,
      });
      if (bill.isDone){
        await t.rollback();
        return res.status(400).json("cannot update, bill is already done");
      }
      if (!detail || detail.length == 0) {
        await t.commit();
        await bill.reload();
        return res.status(200).json(bill);
      }

      await BillDetail.destroy(
        {
          where: {
            billId,
          },
          transaction: t,
        },
        {
          focus: true,
        }
      );

      await BillDetail.bulkCreate(
        detail.map((item) => {
          return {
            ...item,
            billId,
          };
        }),
        { transaction: t }
      );

      await t.commit();
      const newBill = await Bill.findByPk(billId, {
        include: [Food],
      });

      res.status(200).json(newBill);
    } catch (error) {
      await t.rollback();
      console.log(error);
      res.status(500).json(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const bill = await Bill.findByPk(id, {
        include: [Food],
      });
      if (!bill) return res.status(400).json("id not found");
      res.status(200).json(bill);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const bills = await Bill.findAll({
        // include: [Food],
      });
      res.status(200).json(bills);
    } catch (error) {
      console.log(error);
    }
  },
  getInDay: async (req, res) => {
    try {
      const day = req.query?.day;
      if (!day) return res.status(400).json("day is required");
      const dayFormat = moment(day).format("yyyy-MM-dd");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getBillNotDone: async (req, res) => {
    try {
      const bills = await Bill.findAll({
        where: {
          isDone: false,
        },
        // include: [Food],
      });
      res.status(200).json(bills);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  setBillDone: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const id = req.params?.id;
      if (!id) {
        await t.rollback();
        return res.status(400).json("data is invalid");
      }

      const bill = await Bill.findByPk(id, {
        include: {
          model: Food,
          include: {
            model: Recipe,
            include: [Ingredient],
          },
        },
      });
      if (!bill) {
        await t.rollback();
        return res.status(400).json("bill is not found");
      }

      if (bill.isDone) {
        await t.rollback();
        return res.status(400).json("cannot update, bill is already done");
      }

      await bill.update(
        {
          isDone: true,
        },
        {
          transaction: t,
        }
      );

      //Todo:  trừ nguyên liệu
      const ingredientData = bill.food
        .map((food) => {
          return food.recipe.ingredients.map((recipe) => {
            return {
              quantity: recipe.recipe_detail.quantity,
              ingredientId: recipe.recipe_detail.ingredientId,
            };
          });
        })
        .flat(Infinity);

      const ingredientTotal = ingredientData.reduce(
        (previousValue, currentValue) => {
          previousValue[currentValue.ingredientId] = previousValue[
            currentValue.ingredientId
          ]
            ? previousValue[currentValue.ingredientId] + currentValue.quantity
            : currentValue.quantity;
          return previousValue;
        },
        {}
      );
      const ingredientTotalArray = Object.keys(ingredientTotal).map((key) => ({
        id: parseInt(key),
        quantity: ingredientTotal[key],
      }));
      await Promise.all(
        ingredientTotalArray.map((ingredient) => {
          return Warehouse.decrement(
            {
              quantity: ingredient.quantity,
            },
            {
              where: {
                ingredientId: ingredient.id,
              },
              transaction: t,
            }
          );
        })
      );
      // console.log(ingredientTotalArray);
      await t.commit();
      await bill.reload();
      return res.status(200).json(bill);
    } catch (error) {
      await t.rollback();
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = BillController;
