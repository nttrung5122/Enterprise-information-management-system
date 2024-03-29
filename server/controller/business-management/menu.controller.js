const { Menu, MenuDetail, SectionMenu, Food } = require("../../models");

const MenuController = {
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const menu = await Menu.findByPk(id);
      if (!menu) {
        return res.status(404).json("id not found");
      }
      return res.status(200).json(menu);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const menus = await Menu.findAll();
      return res.status(200).json(menus);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const nameMenu = req.body?.name;
      const info = req.body?.info;
      const details = req.body?.details;
      // [
      //     {
      //         sectionMenuId:10
      //     }
      // ]
      if (!nameMenu || !info || !details || details.length == 0) {
        return res.status(400).json("Data is invalid");
      }
      const newMenu = await Menu.create(
        {
          nameMenu,
          info,
        },
        { transaction: t }
      );

      await MenuDetail.bulkCreate(
        details.map((detail) => {
          return {
            ...detail,
            menuId: newMenu.id,
          };
        }),
        { transaction: t }
      );

      const menu = await Menu.findByPk(newMenu.id, {
        include: {
          model: SectionMenu,
          include: Food,
        },
      });
      await t.commit();
      res.status(200).json(menu);
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
      const details = req.body?.details;
      // [
      //     {
      //         sectionMenuId:10
      //     }
      // ]
      if (!details || details.length == 0) {
        return res.status(400).json("Data is invalid");
      }

      const menu = await Menu.findByPk(id);

      if (!menu) return res.status(404).json("Id menu not found");

      await MenuDetail.destroy(
        {
          where: {
            menuId: id,
          },
          transaction: t,
        },
        {
          focus: true,
        }
      );

      await MenuDetail.bulkCreate(
        details.map((detail) => {
          return {
            ...detail,
            menuId: id,
          };
        }),
        { transaction: t }
      );

      const menuUpdated = await Menu.findByPk(newMenu.id, {
        include: {
          model: SectionMenu,
          include: Food,
        },
      });

      await t.commit();
      res.status(200).json(menuUpdated);
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
      const menu = await Menu.findByPk(id);
      if (!menu) return res.status(404).json("Id menu not found");


      await MenuDetail.destroy(
        {
          where: {
            menuId: id,
          },
          transaction: t,
        },
        {
          focus: true,
        }
      );

      await menu.destroy({ force: true, transaction: t });
      await t.commit();
      return res.status(200).json("success");
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(500).json(error);
    }
  },
};

module.exports = MenuController;
