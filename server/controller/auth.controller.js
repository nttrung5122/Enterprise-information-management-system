const bcrypt = require("bcrypt");
const { Account, Permission, Employee } = require("../models");
const { where } = require("sequelize");
const AccountController = {
  login: async (req, res) => {
    try {
      const id = req.body?.user;
      const password = req.body?.password;
      console.log(id, password);
      if (!id || !password) {
        return res.status(403).json("wrong password or username");
      }
      const account = await Account.findOne({
        where: {
          id,
        },
        include: [Permission, Employee],
      });
      console.log(account.permissions[0].info);
      if (!account) {
        return res.status(403).json("wrong password or username");
      }

      const validPassword = bcrypt.compareSync(password, account.password);

      if (validPassword) {
        req.session.account = account;
        account.password = null;
        return res.status(200).json(account);
      }
      return res.status(403).json("wrong password or username");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  changePassword: async (req, res) => {
    try {
      const id = req.body?.user;
      const password = req.body?.password;
      if (
        req.session?.account &&
        (req.session.account.id == id ||
          req.session.account.permissions.reduce(
            (previousValue, currentValue) => {
              if (currentValue.info == "admin") return true;
              return previousValue;
            },
            false
          ))
      ) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        await Account.update(
          { password: hashPassword },
          {
            where: {
              id,
            },
          }
        );
        return res.status(200).json("success");
      }
      return res.status(401).json("you are not allowed to change");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = AccountController;
