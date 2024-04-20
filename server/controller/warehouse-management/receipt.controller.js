const { Op } = require("sequelize");
const {
  Receipt,
  Ingredient,
  Employee,
  Supplier,
  sequelize,
  ReceiptDetail,
  Warehouse,
} = require("../../models");
const moment = require("moment");

const ReceiptController = {
  getAll: async (req, res) => {
    try {
      const receipt = await Receipt.findAll({
        include: [Ingredient, Employee, Supplier],
      });
      return res.status(200).json(receipt);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params?.id;
      const receipt = await Receipt.findByPk(id, {
        include: [Ingredient, Employee, Supplier],
      });
      if (!receipt) return res.status(400).json("id not found");
      return res.status(200).json(receipt);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const employeeId = req.body?.employeeId;
      // const employeeId = req.session.account.id;
      const supplierId = req.body?.supplierId;
      const date = req.body?.date || Date.now();
      const details = req.body?.details;
      // {
      //     ingrendientId,
      //     quantity,
      //     pricePerUnit,
      // }

      if (!employeeId || !supplierId || !details) {
        await t.rollback();
        return res.status(400).json("Data is invalid");
      }

      const newReceipt = await Receipt.create(
        {
          employeeId,
          supplierId,
          date,
          priceTotal: details.reduce((previousValue, currentValue) => {
            return (
              previousValue + currentValue.quantity * currentValue.pricePerUnit
            );
          }, 0),
        },
        {
          transaction: t,
        }
      );
      const receiptDetails = details.map((detail) => {
        return {
          ...detail,
          receiptId: newReceipt.id,
          price: detail.quantity * detail.pricePerUnit,
        };
      });
      await ReceiptDetail.bulkCreate(receiptDetails, {
        transaction: t,
      });
      for (const detail of details) {
        const ingredient = await Warehouse.findOne({
          where: {
            ingredientId: detail.ingredientId,
          },
        });
        if (!ingredient) {
          throw "Ingredient not found";
        }
        await ingredient.increment("quantity", {
          by: detail.quantity,
          transaction: t,
        });
      }

      await t.commit();
      const receipt = await Receipt.findByPk(newReceipt.id, {
        include: [Ingredient, Employee, Supplier],
      });
      return res.status(200).json(receipt);
    } catch (error) {
      console.log(error);
      await t.rollback();
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const id = req.params?.id;
      const employeeId = req.body?.employeeId;
      // const employeeId = req.session.account.id;
      const supplierId = req.body?.supplierId;
      const date = req.body?.date || Date.now();
      const details = req.body?.details;
      // {
      //     ingrendientId,
      //     quantity,
      //     pricePerUnit,
      // }

      if (
        !employeeId &&
        !date &&
        !supplierId &&
        (!details || details.length == 0)
      ) {
        await t.rollback();
        return res.status(403).json("Data is invalid");
      }
      const receipt = await Receipt.findByPk(id);
      if (!receipt) {
        await t.rollback();
        return res.status(400).json("id not found");
      }

      await receipt.update(
        {
          employeeId,
          date,
          supplierId,
        },
        { transaction: t }
      );

      if (!details || details.length == 0) {
        await t.commit();
        await receipt.reload();
        return res.status(200).json(receipt);
      }


      // xóa thông tin cũ

      const receiptDetails = await ReceiptDetail.findAll({
        where: {
          receiptId: id,
        },
      });

      await Promise.all(
        receiptDetails.map((receiptDetail) => {
          return Warehouse.decrement(
            {
              quantity: receiptDetail.quantity,
            },
            {
              where: {
                ingredientId: receiptDetail.ingredientId,
              },
              transaction: t,
            }
          );
        })
      );

      await ReceiptDetail.destroy({
        where: {
          receiptId: id,
        },
        transaction: t,
        force:true
      });

      // cập nhật thông tin mới
      const priceTotal = details.reduce((previousValue, currentValue) => {
        return (
          previousValue + currentValue.quantity * currentValue.pricePerUnit
        );
      }, 0);
      await receipt.update(
        {
          priceTotal,
        },
        { transaction: t }
      );

      await Promise.all(
        details.map((detail) => {
          return Warehouse.increment(
            {
              quantity: detail.quantity,
            },
            {
              where: {
                ingredientId: detail.ingredientId,
              },
              transaction: t,
            }
          );
        })
      );
      await ReceiptDetail.bulkCreate(details, {
        transaction: t,
      });
      await t.commit();
      const receiptNew = await Receipt.findByPk(id, {
        include: [Ingredient, Employee, Supplier],
      });
      return res.status(200).json(receipt);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    const t = await sequelize.transaction()

    try {
      const id = req.params?.id;
      const receipt = await Receipt.findByPk(id);
      if (!receipt) {
        return res.status(403).json("id not found");
      }

      const receiptDetails = await ReceiptDetail.findAll({
        where: {
          receiptId: id,
        },
      });

      await Promise.all(
        receiptDetails.map((receiptDetail) => {
          return Warehouse.decrement(
            {
              quantity: receiptDetail.quantity,
            },
            {
              where: {
                ingredientId: receiptDetail.ingredientId,
              },
              transaction: t,
            }
          );
        })
      );

      await ReceiptDetail.destroy({
        where: {
          receiptId: id,
        },
        transaction: t,
        force:true
      });

      await receipt.destroy({force:true});
      await t.commit();
      res.status(200).json("success");

    } catch (error) {
      console.log(error);
      await t.rollback();
      return res.status(500).json(error);
    }
  },
  calInMonth: async (year, month)=>{
    const startOfMonth = moment(`${year}/${month}/01`).format('YYYY/MM/DD');
    const endOfMonth = moment(`${year}/${month}/01`).endOf('month').format('YYYY/MM/DD');
    const receipts = await Receipt.findAll({
      where:{
        date: {
          [Op.between]: [startOfMonth, endOfMonth]
        }
      },
      include: [Ingredient]
    });
    const ingredientList = await Ingredient.findAll();
    const dataStatistics = ingredientList.reduce((previousValue, currentValue) => {
      previousValue[currentValue.id] = {
        id: currentValue.id,
        name: currentValue.nameIngredient,
        unitCal: currentValue.unitCal,
        totalPrice: 0,
        totalQuantity: 0,
        avgPrice: 0
      }
      return previousValue;
    }, {})

    receipts.forEach((receipt) => {
      receipt.ingredients.forEach((detail) => {
        dataStatistics[detail.id].totalPrice += detail.receipt_detail.price;
        dataStatistics[detail.id].totalQuantity += detail.receipt_detail.quantity;
        dataStatistics[detail.id].avgPrice = dataStatistics[detail.id].totalPrice / dataStatistics[detail.id].totalQuantity;
      })
    })
    // const dataStatisticsArray = Array.from((new Map(Object.entries(dataStatistics))).values())
    return dataStatistics;
    // return dataStatisticsArray;
  },
  calInYear: async (year)=>{
    const startOfYear = moment(`${year}/01/01`).format('YYYY/MM/DD');
    const endOfYear = moment(`${year}/01/01`).endOf('year').format('YYYY/MM/DD');
    const receipts = await Receipt.findAll({
      where:{
        date: {
          [Op.between]: [startOfYear, endOfYear]
        }
      },
      include: [Ingredient]
    });
    const ingredientList = await Ingredient.findAll();
    const dataStatistics = ingredientList.reduce((previousValue, currentValue) => {
      previousValue[currentValue.id] = {
        id: currentValue.id,
        name: currentValue.nameIngredient,
        unitCal: currentValue.unitCal,
        totalPrice: 0,
        totalQuantity: 0,
        avgPrice: 0
      }
      return previousValue;
    }, {})

    receipts.forEach((receipt) => {
      receipt.ingredients.forEach((detail) => {
        dataStatistics[detail.id].totalPrice += detail.receipt_detail.price;
        dataStatistics[detail.id].totalQuantity += detail.receipt_detail.quantity;
        dataStatistics[detail.id].avgPrice = dataStatistics[detail.id].totalPrice / dataStatistics[detail.id].totalQuantity;
      })
    })
    // const dataStatisticsArray = Array.from((new Map(Object.entries(dataStatistics))).values())
    return dataStatistics;
    // return dataStatisticsArray;
  },
  statisticsInMonth: async (req,res) => {
    try {
      const month= req.query?.month;
      const year= req.query?.year;
      if(!month || !year){
        return res.status(403).json("Data is invalid");
      }
      const data = await ReceiptController.calInMonth(year,month);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticsInYear: async (req,res) => {
    try {
      const year= req.query?.year;
      if(!year){
        return res.status(403).json("Data is invalid");
      }
      const data = await ReceiptController.calInYear(year);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticsEachMonth: async (req,res) => {
    try {
      const year= req.query?.year;
      if(!year){
        return res.status(403).json("Data is invalid");
      }
      const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
      const data = await Promise.all(monthArr.map((month)=>{
        return ReceiptController.calInMonth(year,month)
      }))
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

module.exports = ReceiptController;
