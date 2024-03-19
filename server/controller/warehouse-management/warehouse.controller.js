const { Warehouse, Ingredient } = require("../../models");

const WarehouseController = {
    getAll: async (req,res)=>{
        try {
            const store = await Warehouse.findAll({
                include: [Ingredient]
            })
            return res.status(200).json(store)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    get: async (req, res)=>{
        try {
            const id = req.params?.id;
            if(!id) {
                return res.status(400).json("id is required");
            }
            const store = await Warehouse.findByPk(id,{
                include:[Ingredient]
            });
            return res.status(200).json(store);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    update: async (req, res)=>{
        try {
            const id = req.params?.id;
            const quantity = req.body?.quantity;
            if(!id || !quantity) {
                return res.status(400).json("data invalid");
            }
            const store = await Warehouse.findOne({
                where:{
                    ingredientId: id
                }
            });
            if(!store) {
                return res.status(404).json("ingredient not found");
            }
            await store.update({
                quantity:quantity,
            })
            await store.reload();
            res.status(200).json(store);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}

module.exports = WarehouseController