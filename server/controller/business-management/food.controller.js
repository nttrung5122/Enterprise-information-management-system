const e = require('express');
const { Food, Receipt, Ingredient, Recipe, SectionDetail } = require('../../models')

const FoodController = {
    get: async (req,res)=>{
        try {
            const id = req.params.id;
            if(!id) {
                return res.status(400).json("id is required");
            }

            const food =  await Food.findByPk(id,{include:{
                model:Recipe,
                include:Ingredient
            }});
            if(!food) return res.status(400).json("id not found");
            return res.status(200).json(food);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    getAll: async (req,res)=>{
        try {
            const foods = await Food.findAll();
            res.status(200).json(foods)
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    create: async (req,res)=>{
        try {
            const nameFood = req.body?.name;
            const info =  req.body?.info;
            const price = req.body?.price;
            const recipeId = req.body?.recipeId;
            if(!nameFood || !info || !price || !recipeId) return res.status(400).json("data is invalid");

            const recipe = await Recipe.findByPk(recipeId);
            if(!recipe)
                return res.status(400).json('recipe not found');
            const food = await Food.create({
                nameFood,
                info,
                price,
                recipeId
            })
            return res.status(200).json(food);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }

    },
    update: async (req,res)=>{
        try {
            const id = req.params.id;
            const nameFood = req.body?.nameFood;
            const info =  req.body?.info;
            const price = req.body?.price;
            const recipeId = req.body?.recipeId;
            if(!nameFood && !info && !price && !recipeId) return res.status(400).json("data is invalid");
            const food = await Food.findByPk(id);
    
            if(recipeId){
                const recipe = await Recipe.findByPk(recipeId);
                if(!recipe)
                    return res.status(400).json('recipe not found');
            }

            if(!food)
                return res.status(400).json('id not found');
            await food.update({
                nameFood,
                info,
                price,
                recipeId
            });
            await food.reload();
            return res.status(200).json(food);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    delete: async (req,res)=>{
        try {
            const id = req.params.id;
            const secionDetails = await SectionDetail.findAll({
                where:{
                    foodId: id,
                }
            })

            if(secionDetails.length > 0){
                return res.status(400).json("food has section details, cannot be deleted");
            }

            const food = await Food.findByPk(id);
            if(!food)
                return res.status(400).json('id not found');
            await food.update({
                disable: true
            })
            await food.reload();
            return res.status(200).json(food);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

}

module.exports = FoodController;