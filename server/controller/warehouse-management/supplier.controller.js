const { Supplier, Receipt } = require("../../models");

const SupplierController = {
    getAll: async (req,res)=>{
        try {
            const suppliers =  await Supplier.findAll();
            return res.status(200).json(suppliers);
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
            const supplier = await Supplier.findByPk(id);
            if(!supplier) {
                return res.status(400).json("id not found");
            }
            return res.status(200).json(supplier);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    create: async (req, res)=>{
        try {
            const {name, email,phoneNumber } = req.body;
            if(!name ||!email ||!phoneNumber) {
                return res.status(400).json("name, email and phoneNumber are required");
            }
            const supplier = await Supplier.create({
                name,
                email,
                phoneNumber
            });
            return res.status(200).json(supplier);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    update: async (req, res)=>{
        try {
            const id = req.params?.id;
            const {name, email,phoneNumber } = req.body;
            const supplier = await Supplier.findByPk(id);
            if(!supplier) {
                return res.status(400).json("id not found");
            }
            await supplier.update({
                name,
                email,
                phoneNumber
            })
            await supplier.reload();
            return res.status(200).json(supplier);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    delete: async (req, res)=>{
        try {
            const id = req.params?.id;
            const supplier = await Supplier.findByPk(id);
            if(!supplier) {
                return res.status(400).json("id not found");
            }
            const receipts = await Receipt.findAll({
                supplierId: id
            })
            if(receipts.length > 0){
                return res.status(400).json("supplier has receipts, cannot be deleted");
            }
            await supplier.destroy({force: true});
            return res.status(200).json("success");
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}

module.exports = SupplierController