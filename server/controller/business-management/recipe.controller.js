const { Recipe, Ingredient, RecipeDetail, sequelize, Food } = require("../../models");

const RecipeController = {
  get: async (req, res) => {
    try {
      const id = req.params?.id;
      if (!id) {
        return res.status(400).json("id is required");
      }
      const recipe = await Recipe.findByPk(id, {
        include: [Ingredient],
      });
      return res.status(200).json(recipe);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const name = req.body?.name;
      const detail = req.body?.detail;
      // [
      //     {
      //         ingredientId: 1,
      //         quantity: 10,
      //     }
      // ]
      if (!name || !detail || detail.length == 0) {
        return res.status(400).json("data is invalid");
      }
      const newRecipe = await Recipe.create(
        { nameRecipe: name },
        {
          transaction: t,
        }
      );

      await RecipeDetail.bulkCreate(
        detail.map((item) => {
          return {
            ...item,
            recipeId: newRecipe.id,
          };
        }),
        { transaction: t }
      );

      const recipe = await Recipe.findByPk(newRecipe.id);
      await t.commit();
      return res.status(200).json(recipe);
    } catch (error) {
      await t.rollback();
      console.log(error);
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const detail = req.body?.detail;
      // [
      //     {
      //         ingredientId: 1,
      //         quantity: 10,
      //     }
      // ]
      if (!detail || detail.length == 0) {
        return res.status(400).json("data is invalid");
      }
      const recipe = await Recipe.findByPk(id);

      if (!recipe) {
        return res.status(400).json("id not found");
      }

      await RecipeDetail.destroy(
        {
          where: {
            recipeId: recipe.id,
          },
          transaction: t,
        },
        {
          focus: true,
        }
      );

      await RecipeDetail.bulkCreate(
        detail.map((item) => {
          return {
            ...item,
            recipeId: newRecipe.id,
          };
        }),
        { transaction: t }
      );

      const newRecipe  = await Recipe.findByPk(id,{
        include:[Ingredient]
      })

      await t.commit()
      return res.status(200).json(newRecipe);

    } catch (error) {
      console.log(error);
      await t.rollback()
      return res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const recipe = await Recipe.findByPk(id);
        
        if(!recipe) return res.status(404).json("Recipe not found");

        const foods = await Food.findAll(
            {
                where: {
                    recipeId: recipe.id
                }
            }
        )
        
        if(foods.length > 0 ){
            return res.status(400).json("recipe has food, cannot be deleted");
        }

        await RecipeDetail.destroy(
            {
                where: {
                    recipeId: recipe.id,
                },
                transaction: t,
            },
            {
                focus: true,
            }
        );

        await recipe.destroy({transaction: t},{focus: true});
        
        await t.commit()

        return res.status(200).json('success')

    } catch (error) {
        await t.rollback()
        console.log(error);
        return res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
        const recipes = await Recipe.findAll();
        return res.status(200).json(recipes);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
  }
};

module.exports = RecipeController;
