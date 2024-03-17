const { Role, EmployeeStatus } = require("../../models");

const RoleController = {
    getRole: async (req, res) => {
        try {
            const roleId = req.params?.id;
            if(!roleId){
                return res.status(403).json("data is invalid");
            }
            const role =  await Role.findByPk(roleId);
            if(!role) {
                return res.status(403).json("id not found");
            }
            res.status(200).json(role);

        } catch (error) {
            console.log(error);
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
            const info = req.body?.info;
            const roleId = req.body?.roleId;
            const baseSalary = req.body?.baseSalary;
            if (!info ||!baseSalary ||!roleId) {
                return res.status(403).json("data is invalid");
            }

            const newRole = await Role.update({
                info,
                baseSalary,
            },{
                where: {
                    id: roleId
                }
            })
            res.status(200).json("success");
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    removeRole: async (req, res) => {
        try {
            const roleId = req.params?.id;
            if(!roleId){
                return res.status(403).json("data is invalid");
            }
            const role =  await Role.findByPk(roleId);
            if(!role){
                return res.status(403).json("Id not found");
            }
            const check = await EmployeeStatus.findAll({
                where:{
                    roleId: roleId
                }
            })
            console.log(check);
            if(check.length!=0){
                return res.status(403).json("There are employees in this position, they cannot be deleted");
            }
            await role.destroy({force: true});
            return res.status(200).json("ok")
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
            
        }
    }
}

module.exports = RoleController