
const {Ingredient, Warehouse} = require('../../models')

const IngredientsController = {
    getAll: async (req,res)=>{
        try {
            const allIngredient = await Ingredient.findAll();
            return res.status(200).json(allIngredient);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    get: async (req, res)=>{
        try {
            const id = req.params?.id
            if(!id) {
                return res.status(400).json('Ingredient id is required')
            }
            const ingredient = await Ingredient.findByPk(id);
            if(!ingredient) {
                return res.status(404).json('Ingredient not found')
            }
            return res.status(200).json(ingredient);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    create: async (req, res)=>{
        try {
            const nameIngredient = req.body?.nameIngredient;
            const unitCal = req.body?.unitCal;
            if(!nameIngredient || !unitCal) {
                return res.status(404).json("data invalid")
            }
            const ingredient = await Ingredient.create({
                nameIngredient,
                unitCal
            });
            await Warehouse.create({
                ingredientId: ingredient.id,
                quantity:0
            })
            return res.status(200).json(ingredient);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    update: async (req, res)=>{
        try {
            const id = req.params?.id;
            if(!id) {
                return res.status(400).json('Ingredient id is required')
            }
            const ingredient = await Ingredient.findByPk(id);
            if(!ingredient) {
                return res.status(400).json('id not exists')
            }
            const nameIngredient = req.body?.nameIngredient;
            const unitCal = req.body?.unitCal;
            await ingredient.update({
                nameIngredient,
                unitCal
            })
            await ingredient.reload();
            return res.status(200).json(ingredient);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    delete: async (req, res)=>{
        try {
            const id = req.params?.id
            if(!id) {
                return res.status(400).json('Ingredient id is required')
            }
            const ingredient = await Ingredient.findByPk(id);
            if(!ingredient) {
                return res.status(404).json('Ingredient not found')
            }
            const ingredientInWareHouse = await Warehouse.findOne({
                where:{
                    ingredientId: id
                }
            })
            console.log(ingredientInWareHouse)
            if(ingredientInWareHouse.quantity > 0) {
                return res.status(400).json('Ingredient is in warehouse, cannot be deleted')
            } 
            await ingredientInWareHouse.destroy({force: true})
            await ingredient.destroy({force:true});

            return res.status(200).json("success");
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}

module.exports = IngredientsController