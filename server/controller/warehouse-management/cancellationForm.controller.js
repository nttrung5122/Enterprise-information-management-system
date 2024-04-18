const { where } = require("sequelize");
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
        include: [Ingredient, ReasonCancellation],
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
      const cancellationForm = await CancellationForm.findByPk(id, {
        include: [
          {
            model: Ingredient,
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
      const note = req.body?.note;
      const employeeId = req.body?.employeeId;
      // const employeeId = req.session.account.employeeId
      const details = req.body?.details;
      // [
        // {
          //     ingredientId,
          //     quantity
          // }
      // ]
          const date = req.body?.date;
      // const reasonCancellationId = req.body?.reasonCancellationId;
      // if (!note || !employeeId || !details || !reasonCancellationId) {
        if (!note || !employeeId || !details ) {
        await t.rollback();
        return res.status(403).json("Data is invalid");
      }

      const newCancellationForm = await CancellationForm.create(
        {
          note,
          employeeId,
          date: date || Date.now(),
          // reasonCancellationId,
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
        if (!ingredient) {
          throw "Ingredient not found";
        }
        if (ingredient.quantity < detail.quantity) {
          throw "The number of cancellations is greater than the number in stock";
        }
        await ingredient.decrement("quantity", {
          by: detail.quantity,
          transaction: t,
        });
      }

      // delete in warehouse
      await t.commit();
      const cancellationForm = await CancellationForm.findByPk(
        newCancellationForm.id,
        {
          // include: [ReasonCancellation, Ingredient],
          include: [Ingredient],
        }
      );
      return res.status(200).json(cancellationForm);
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
      const note = req.body?.note;
      const employeeId = req.body?.employeeId;
      const details = req.body?.details;
            // [
        // {
          //     ingredientId,
          //     quantity
          // }
      // ]
      const date = req.body?.date;
      // const reasonCancellationId = req.body?.reasonCancellationId;
      if (
        !note &&
        !employeeId &&
        !date &&
        // !reasonCancellationId &&
        (!details || details.length == 0)
      ) {
        await t.rollback();
        return res.status(403).json("Data is invalid");
      }

      const cancellationForm = await CancellationForm.findByPk(id);
      if (!cancellationForm) {
        await t.rollback();
        return res.status(403).json("id not found");
      }

      await cancellationForm.update(
        {
          note,
          employeeId,
          date,
          // reasonCancellationId,
        },
        { transaction: t }
      );

      if (!details || details.length == 0) {
        await t.commit();
        await cancellationForm.reload();
        return res.status(200).json(cancellationForm);
      }

      // xóa chi tiết form cũ
      const cancellationFormDetails = await  CancellationFormDetail.findAll({
        where: {
          cancellationFormId: id,
        },
      });
      await Promise.all(
        cancellationFormDetails.map((cancellationFormDetail) => {
          return Warehouse.increment(
            {
              quantity: cancellationFormDetail.quantity,
            },
            {
              where: {
                ingredientId: cancellationFormDetail.ingredientId,
              },
              transaction: t,
            }
          );
        })
      );
      await CancellationFormDetail.destroy({
        where: {
          cancellationFormId: id,
        },
        transaction: t,
      },{
        focus:true
      })


      // cập nhập chi tiết mới
      await Promise.all(
        details.map((detail) => {
          return Warehouse.decrement(
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
      await CancellationFormDetail.bulkCreate(details, {
        transaction: t,
      });
      await t.commit();
      const cancellationFormNew = await CancellationForm.findByPk(
        id,
        {
          include: [Ingredient],
        }
      );
      
      return res.status(200).json(cancellationFormNew);

    } catch (error) {
      console.log(error);
      await t.rollback();
      return res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    const t = await sequelize.transaction()
    try {
      const id = req.params?.id;
      const cancellationForm = await CancellationForm.findByPk(id);
      if (!cancellationForm) {
        return res.status(403).json("id not found");
      }
      const cancellationFormDetails = await  CancellationFormDetail.findAll({
        where: {
          cancellationFormId: id,
        },
      });
      await Promise.all(
        cancellationFormDetails.map((cancellationFormDetail) => {
          return Warehouse.increment(
            {
              quantity: cancellationFormDetail.quantity,
            },
            {
              where: {
                ingredientId: cancellationFormDetail.ingredientId,
              },
              transaction: t,
            }
          );
        })
      );
      await CancellationFormDetail.destroy({
        where: {
          cancellationFormId: id,
        },
        transaction: t,
        force:true
      })

      await cancellationForm.destroy({force:true});
      await t.commit();
      return res.status(200).json("success");
    } catch (error) {
      console.log(error);
      await t.rollback();
      return res.status(500).json(error);
    }
  },
};

module.exports = CancellationFormController;
