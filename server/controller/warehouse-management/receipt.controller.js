const {
  Receipt,
  Ingredient,
  Employee,
  Supplier,
  sequelize,
  ReceiptDetail,
  Warehouse,
} = require("../../models");

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
      if(!receipt) return res.status(400).json("id not found");
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
      const note = req.body?.note;
      const date = req.body?.date || Date.now();
      const details = req.body?.details;
      // {
      //     ingrendientId,
      //     quantity,
      //     pricePerUnit,
      // }

      if (!employeeId || !supplierId || !details) {
        return res.status(400).json("Data is invalid");
      }

      const newReceipt = await Receipt.create(
        {
          employeeId,
          supplierId,
          date,
          note,
          priceTotal: details.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.quantity * currentValue.pricePerUnit
          }, 0)
        },
        {
          transaction: t,
        }
      );
      const receiptDetails = details.map((detail) => {
        return {
          ...detail,
          receiptId: newReceipt.id,
          price: detail.quantity * detail.pricePerUnit
        }
      })
      await ReceiptDetail.bulkCreate(receiptDetails,{
        transaction:t
      });
      for(const detail of details){
        const ingredient = await Warehouse.findOne({
          where: {
            ingredientId: detail.ingredientId,
          },
        });
        if(!ingredient) {
            throw "Ingredient not found"
        } 
        await ingredient.increment("quantity", {
          by: detail.quantity,
          transaction: t,
        })
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
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};

module.exports = ReceiptController;
