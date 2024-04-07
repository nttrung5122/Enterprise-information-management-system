const {
  CancellationForm,
  CancellationFormDetail,
  ReasonCancellation,
  sequelize,
  Ingredient,
  Warehouse,
} = require("../../models");

const CancellationFormController = {
  getAll: async (req, res) => {
    try {
      const cancellationForm = await CancellationForm.findAll({
        include:[Ingredient,ReasonCancellation]
      });
      return res.status(200).json(cancellationForm);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params?.id;
      if (!id) {
        return res.status(403).json("id is required");
      }
      const cancellationForm = await CancellationForm.findByPk(id,{
        include: [
          {
            model: Ingredient
          },
          {
            model: ReasonCancellation,
          },
        ],
      });
      if (!cancellationForm) {
        return res.status(403).json("id not found");
      }
      return res.status(200).json(cancellationForm);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      
      const info = req.body?.info;
      const employeeId = req.body?.employeeId;
      // const employeeId = req.session.account.employeeId
      const details = req.body?.details;
      // {
      //     ingredientId,
      //     quantity
      // }
      const date = req.body?.date
      const reasonCancellationId = req.body?.reasonCancellationId;
      if (!info || !employeeId || !details || !reasonCancellationId) {
        await t.rollback();
        return res.status(403).json("Data is invalid");
      }

      const newCancellationForm = await CancellationForm.create(
        {
          info,
          employeeId,
          date: date|| Date.now(),
          reasonCancellationId,
        },
        {
          transaction: t,
        }
      );
      const cancellationFormDetails = details.map((detail) => {
        return {
          cancellationFormId: newCancellationForm.id,
          ...detail,
        };
      });
      await CancellationFormDetail.bulkCreate(cancellationFormDetails, {
        transaction: t,
      });
      for (const detail of details) {
        const ingredient = await Warehouse.findOne({
          where: {
            ingredientId: detail.ingredientId,
          },
        });
        if(!ingredient) {
            throw "Ingredient not found"
        }
        if(ingredient.quantity < detail.quantity) {
            throw "The number of cancellations is greater than the number in stock"            
        }
        await ingredient.decrement("quantity", {
          by: detail.quantity,
          transaction: t,
        });
      }

      // delete in warehouse
      await t.commit();
      const cancellationForm = await CancellationForm.findByPk(newCancellationForm.id,{
        include: [ReasonCancellation,Ingredient]
      })
      return res.status(200).json(cancellationForm);
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

module.exports = CancellationFormController;
