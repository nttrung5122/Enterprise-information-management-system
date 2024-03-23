const { Op } = require("sequelize");
const {
  Warehouse,
  Ingredient,
  Receipt,
  ReceiptDetail,
  CancellationForm,
  ReasonCancellation,
} = require("../../models");

const statistic = async ( firstDay,lastDay) => {
  const receipts = await Receipt.findAll({
    where: {
      date: {
        [Op.lt]: lastDay,
        [Op.gt]: firstDay,
      },
    },
    include: [Ingredient],
  });

  const cancellationForms = await CancellationForm.findAll({
    where: {
      date: {
        [Op.lt]: lastDay,
        [Op.gt]: firstDay,
      },
    },
    include: [Ingredient],
  });
  const ingredients = await Ingredient.findAll();

  const statisticIngredient = ingredients.reduce((preValue, ingredient) => {
    preValue[ingredient.id] = {
      name: ingredient.nameIngredient,
      quantity: 0,
      totalPrice: 0,
      averagePricePerUnit: 0,
    };
    return preValue;
  }, {});
  var totalImportPayment = 0;
  receipts.forEach((item) => {
    item.ingredients.forEach((value) => {
      statisticIngredient[value.id].quantity += value.receipt_detail.quantity;
      statisticIngredient[value.id].totalPrice += value.receipt_detail.price;
      statisticIngredient[value.id].averagePricePerUnit =
        statisticIngredient[value.id].totalPrice /
        statisticIngredient[value.id].quantity;
      totalImportPayment += value.receipt_detail.price;
    });
  });
  // statisticIngredient["totalImportPayment"] = totalImportPayment;

  const reasons = await ReasonCancellation.findAll();

  const statisticCancellation = ingredients.reduce((preValue, ingredient) => {
    preValue[ingredient.id] = {
      name: ingredient.nameIngredient,
      quantityTotal: 0,
      ...reasons.reduce((preValue2, reason) => {
        // preValue2[reason.id] = {
        //   name: reason.name,
        //   quantity: 0,
        // }
        preValue2[reason.id] = 0;

        return preValue2;
      }, {}),
    };
    return preValue;
  }, {});

  cancellationForms.forEach((cancellationForm) => {
    cancellationForm.ingredients.forEach((ingredient) => {
      statisticCancellation[ingredient.id].quantityTotal +=
        ingredient.cancellation_form_detail.quantity;
      // statisticCancellation[ingredient.id][cancellationForm.reasonCancellationId].quantity += ingredient.cancellation_form_detail.quantity
      statisticCancellation[ingredient.id][
        cancellationForm.reasonCancellationId
      ] += ingredient.cancellation_form_detail.quantity;
    });
  });

  return {
    statisticIngredient,
    totalImportPayment,
    statisticCancellation,
  }
};

const WarehouseController = {
  getAll: async (req, res) => {
    try {
      const store = await Warehouse.findAll({
        include: [Ingredient],
      });
      return res.status(200).json(store);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params?.id;
      if (!id) {
        return res.status(400).json("id is required");
      }
      const store = await Warehouse.findByPk(id, {
        include: [Ingredient],
      });
      return res.status(200).json(store);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params?.id;
      const quantity = req.body?.quantity;
      if (!id || !quantity) {
        return res.status(400).json("data invalid");
      }
      const store = await Warehouse.findOne({
        where: {
          ingredientId: id,
        },
      });
      if (!store) {
        return res.status(404).json("ingredient not found");
      }
      await store.update({
        quantity: quantity,
      });
      await store.reload();
      res.status(200).json(store);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  statisticByMonth: async (req, res) => {
    try {
      const month = Number(req.params.month);
      const year = Number(req.params.year);
      const firstDay = new Date(year, month - 1, 0);
      const lastDay = new Date(year, month, 1);

      const data = await statistic(firstDay,lastDay);

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  statisticByYear: async (req, res) => {
    try {
      const year = Number(req.params.year);
      const firstDay = new Date(year, 0, 0);
      const lastDay = new Date(year + 1, 0, 1);

      const data  = await statistic(firstDay,lastDay)
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  statisticInRange: async (req, res) => {
    try {
      const firstDay = req.body.firstDay
      const lastDay = req.body.lastDay
      const data  = await statistic(firstDay,lastDay)
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

module.exports = WarehouseController;
