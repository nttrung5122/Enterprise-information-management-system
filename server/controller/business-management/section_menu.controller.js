const {
  SectionMenu,
  Food,
  sequelize,
  SectionDetail,
  MenuDetail,
} = require("../../models");

const SectionMenuController = {
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const section = await SectionMenu.findByPk(id, {
        include: [Food],
      });
      res.status(200).json(section);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const section = await SectionMenu.findAll();
      res.status(200).json(section);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const nameSection = req.body?.name;
      const info = req.body?.info;
      const details = req.body?.details;
      //[1,2,3,4] array of foodId
      if (!nameSection || !info || !details || details.length == 0) {
        await t.rollback();
        return res.status(400).json("Data is invalid");
      }
      const newSection = await SectionMenu.create(
        {
          nameSection,
          info,
        },
        { transaction: t }
      );

      await SectionDetail.bulkCreate(
        details.map((foodId) => {
          return {
            sectionMenuId: newSection.id,
            foodId,
          };
        }),
        { transaction: t }
      );
      await t.commit();

      const section = await SectionMenu.findByPk(newSection.id, {
        include: [Food],
      });

      res.status(200).json(section);
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const nameSection = req.body?.name;
      const info = req.body?.info;
      const details = req.body?.details;
      //[1,2,3,4] array of foodId

      if ((!details || details.length == 0) && !nameSection && !info) {
        await t.rollback();
        return res.status(400).json("Data is invalid");
      }

      const section = await SectionMenu.findByPk(id,{
        include: [Food],
      });

      
      if (!section) 
      {
        await t.rollback();        
        return res.status(404).json("Id section not found");
      }
      
      await section.update({nameSection,info},{transaction: t})
      
      
      if (!details || details.length == 0) {
        await section.reload();
        await t.commit();
        return res.status(200).json(section);
      }
      
      await SectionDetail.destroy(
        {
          where: {
            sectionMenuId: id,
          },
          transaction: t,
        },
        {
          focus: true,
        }
      );

      await SectionDetail.bulkCreate(
        details.map((foodId) => {
          return {
            foodId,
            sectionMenuId: id,
          };
        }),
        { transaction: t }
      );

      const sectionUpdated = await SectionMenu.findByPk(id, {
        include: [Food],
      });
      await t.commit();
      res.status(200).json(sectionUpdated);
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const section = await SectionMenu.findByPk(id);
      if (!section)
      {
        await t.rollback();
        return res.status(404).json("Id section not found");
      }

      const menuDetail = await MenuDetail.findAll({
        where: {
          sectionMenuId: id,
        },
      });

      if (menuDetail.length > 0) {
        await t.rollback();

        return res
          .status(400)
          .json("section has in menu detail, cannot be deleted");
      }

      await SectionDetail.destroy(
        {
          where: {
            sectionMenuId: id,
          },
          transaction: t,
        },
        {
          focus: true,
        }
      );

      await section.destroy({ force: true, transaction: t });
      await t.commit();
      return res.status(200).json("success");
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(500).json(error);
    }
  },
};

module.exports = SectionMenuController;
