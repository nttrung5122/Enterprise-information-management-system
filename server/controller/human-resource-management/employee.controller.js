const {Employee} = require('../../models')

const EmployeeController = {
    getAllEmployee:async (req,res)=>{
        try {
            const employee = await Employee.findAll();
            res.status(200).json(employee);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = EmployeeController