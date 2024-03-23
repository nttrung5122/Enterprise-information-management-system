const {
  Account,
  AccountPermission,
  Permission,
  Employee,
} = require("../../models");
const PermissionConstants = require('../../constants/permission.const');
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
  getAllPermission: async (req, res) => {
    try {
      const permissions = await Permission.findAll();
      res.status(200).json(permissions);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  changePermission: async (req, res) => {
    try {
      const accountId = req.body?.accountId;
      const newPermissions = req.body?.newPermissions; // array of permissions
      if (!accountId || !newPermissions ) {
        return res.status(403).json("Data is invalid");
      }
      const newPermissionsArr = Array.from(new Set(newPermissions));
      const account = await Account.findByPk(accountId,{
        include: [Permission, Employee]
      });
      if (!account) return res.status(403).json("Account is not found");
      const permissions = await Permission.findAll();

      const permissionsArr = permissions.map((permission) =>permission.id)

      const checkNewPermissionsValid = newPermissionsArr.reduce((previousValue, currentValue) => {
        console.log(permissionsArr.includes(currentValue))
        return previousValue && permissionsArr.includes(currentValue)
      }, true);
      if(!checkNewPermissionsValid)
        return res.status(403).json("Data is invalid");
      await AccountPermission.destroy(
        {
          where: {
            accountId,
          },
        },
        {
          focus: true,
        }
      );

      await AccountPermission.bulkCreate(newPermissionsArr.map((permission) =>{
        return {
          accountId,
          permissionId: permission,
        }
      }));
      const newAccount = await Account.findByPk(accountId,{
        attributes: { exclude: ['password'] },
        include: [Permission, Employee]
      });
      res.status(200).json(newAccount);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
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
    } catch (error) {}
  },
};

module.exports = AccountController;
