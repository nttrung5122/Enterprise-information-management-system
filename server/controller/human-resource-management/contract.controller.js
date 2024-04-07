const { Contract } = require("../../models");

const ContractController = {
  getMyContract: async (req, res) => {
    try {
      if (!req.session?.account) {
        return res.status(403).json("You must be logged in");
      }
      const employeeId = req.session.account.id;
      const contract = await Contract.findAll({
        where: {
          employeeId: employeeId,
        },
      });
      return res.status(200).json(contract);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  getContract: async (req, res) => {
    try {
      //TODO: check hr
      // return all contract and employee info
      const employeeId = req.params?.employeeId;
      if (!employeeId) return res.status(403).status("data is invalid");
      const contract = await Contract.findAll({
        where: {
          employeeId: employeeId,
        },
      });
      return res.status(200).json(contract);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  cancelContract: async (req, res) => {
    try {
      //TODO: check hr and contract still valid
      //change end contract is now
      const contractId = req.body?.contractId;
      if (!contractId) return res.status(403).status("data is invalid");

      const contract = await Contract.findByPk(contractId);

      const endDate = new Date(contract.endDate);

      if (Date.parse(endDate) - Date.parse(Date.now()) <= 0) {
        // date smaller than start date
        return res.status(403).json("The contract has expired");
      }

      await contract.update({
        endDate: Date.now(),
      });

      return res.status(200).json(contract);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  addContract: async (req, res) => {
    try {
      const employeeId = req.body?.employeeId;
      const startDate = req.body?.startDate;
      const endDate = req.body?.endDate;
      const infoContract = req.body?.infoContract;
      if (!employeeId || !startDate || !endDate) {
        return res.status(403).json("data is invalid");
      }
      //Todo: check contract expired, check startDate and endDate valid
      const contract = await Contract.create({
        employeeId,
        startDate,
        endDate,
        infoContract,
      });

      return res.status(200).json(contract);
      // return res.status(200).json("ok");
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};

module.exports = ContractController;
