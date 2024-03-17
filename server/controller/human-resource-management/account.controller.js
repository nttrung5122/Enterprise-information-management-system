const {
  Account,
  AccountPermission,
  Permission,
  Employee,
} = require("../../models");

const AccountController = {
  getAllAccounts: async (req, res) => {
    try {
      const accounts = await Account.findAll({
        include: [Permission, Employee],
      });
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  changePasswordForManager: async (req, res) => {
    try {
      const employeeId = res.body?.employeeId;
      const password = res.body?.password;
      if (!id || !password) {
        return res.status(403).json("Data is invalid");
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
      await Account.update(
        { password: hashPassword },
        {
          where: {
            employeeId,
          },
        }
      );
      return res.status(200).json("success");
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  addPermission: async (req, res) => {
    try {
      
    } catch (error) {
      
    }
  },
  disableAccount: async (req, res) => {
    try {
      const idAccount = req.body?.account;
      if (!idAccount) return res.status(403).json("data is invalid");
      const account = await Account.findByPk(idAccount);
      if (!account) return res.status(403).json("Account is not found");
      await account.update({
        active: false,
      });
      return res.status(200).json(account);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },  
  enableAccount: async (req, res) => {
    try {
      const idAccount = req.body?.account;
      if (!idAccount) return res.status(403).json("data is invalid");
      const account = await Account.findByPk(idAccount);
      if (!account) return res.status(403).json("Account is not found");
      await account.update({
        active: true,
      });
      return res.status(200).json(account);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  deleteAccount: async (req, res) => {
    try {
      
    } catch (error) {
      
    }
  }
};

module.exports = AccountController;
