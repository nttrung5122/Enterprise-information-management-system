const { Role } = require("../../models");

const RoleController = {
    getRole: async (req, res) => {
        try {
            const roleId = req.params?.roleId;
            const role =  await Role.findByPk(roleId);
            if(!role) {
                return res.status(403).json("error");
            }
            res.status(200).json(role);

        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllRole: async (req,res) =>{
        try {
            const role = await Role.findAll();
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    addRole: async (req,res) =>{
        try {
            const info = req.body?.info;
            const baseSalary = req.body?.baseSalary;
            if (!info ||!baseSalary) {
                return res.status(403).json("error");
            }
            const role = await Role.create({
                info,
                baseSalary
            });
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateRole: async(req, res)=>{
        try {
            
        } catch (error) {
            
        }
    }
}

module.exports = RoleController