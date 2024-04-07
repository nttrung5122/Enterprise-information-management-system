const bcrypt = require("bcrypt");
const { Account, Permission, Employee, EmployeeStatus } = require("../models");
const { where } = require("sequelize");
const AccountController = {
  login: async (req, res) => {
    try {
      const employeeId = req.body?.user;
      const password = req.body?.password;
      if (!employeeId || !password) {
        return res.status(403).json("wrong password or username");
      }
      const account = await Account.findOne({
        where: {
          employeeId,
        },
        include: [Permission, Employee],
      });
      if (!account) {
        return res.status(403).json("wrong password or username");
      }

      const validPassword = bcrypt.compareSync(password, account.password);

      if (!validPassword) {
        return res.status(403).json("wrong password or username");
      }
      if (!account.active) {
        return res.status(403).json("account is disabled");
      }
      req.session.account = account;
      return res.status(200).json(account);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  changePassword: async (req, res) => {
    try {
      const accountId = req.body.accountId;
      const oldPassword = req.body?.oldPassword;
      const newPassword = req.body?.newPassword;

      if (!oldPassword || !newPassword) {
        return res.status(403).json("Data is invalid");
      }

      // if (req.session?.account) {
      //   return res.status(401).json("you are not allowed to change");
      // }
      const account = await Account.findOne({
        where: {
          id: accountId,
        },
      });
      if (!account) {
        return res.status(403).json("Not Found Account");
      }

      const validPassword = bcrypt.compareSync(oldPassword, account.password);
      if (!validPassword) {
        return res.status(403).json("wrong password");
      }
      await Account.update(
        {
          password: newPassword,
        },
        {
          where: {
            id: accountId,
          },
        }
      );
      return res.status(200).json("success");
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};

module.exports = AccountController;
