const {Account,AccountPermission,Permission, Employee} = require('../../models')

const AccountController = {
    getAllAccounts: async (req, res) => {
        try {
            const accounts = await Account.findAll({
                include: [Permission,Employee]
            })
            res.status(200).json(accounts);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    changePassword: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },
    changePasswordForManager: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },
    changeOwner: async (req, res) => {

    },
    disableAccount: async (req, res) => {

    },
}

module.exports = AccountController