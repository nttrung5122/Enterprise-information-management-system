const { LeaveApplication, sequelize, LeaveApplicationDetail } = require("../../models");

const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

const LeaveApplicationController = {
  getNewApplication: async (req, res) => {
    try {
      const applications = await LeaveApplication.findAll({
        where: {
          isApprove: null,
        },
      });
      res.status(200).json(applications);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  sendApplication: async (req, res) => {
    try {
      const employeeId = req.body?.employeeId;
      // const employeeId = req.session?.account?.employee?.id;
      const startDate = req.body?.startDate;
      const numberOfDaysOff = req.body?.numberOfDaysOff;
      const reason = req.body?.reason;
      if (!employeeId || !startDate || !numberOfDaysOff || !reason)
        return res.status(400).json("Data invalid");
      const checkApplication = await LeaveApplication.findAll({
        where: {
          employeeId,
          startDate: new Date(startDate),
        },
      })

      if(checkApplication.length > 0){
        return res.status(400).json("Application already exists");
      }

      const leaveApplication = await LeaveApplication.create({
        employeeId,
        startDate: new Date(startDate),
        numberOfDaysOff,
        reason,
      });
      res.status(200).json(leaveApplication);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getAllApplication: async (req, res) => {
    try {
      const applications = await LeaveApplication.findAll();
      res.status(200).json(applications);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getApplication: async (req, res) => {
    try {
      const leaveApplicationId = req.params?.leaveApplicationId;
      if (!leaveApplicationId) {
        return res.status(400).json("leaveApplicationId is required");
      }
      const leaveApplication = await LeaveApplication.findByPk(
        leaveApplicationId
      );
      res.status(200).json(leaveApplication);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getMyApplication: async (req, res) => {
    try {
      const employeeId = req.params?.employeeId;
      // const employeeId = req.session?.account?.employee?.id;
      const leaveApplications = await LeaveApplication.findAll({
        where: {
          employeeId,
        },
      });
      res.status(200).json(leaveApplications);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  acceptLeaveApplication: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const leaveApplicationId = req.body?.leaveApplicationId;
      const isApprove = req.body?.isApprove;
      const numberOfDaysAllowed = req.body?.numberOfDaysAllowed;
      if (!leaveApplicationId || !isApprove || !numberOfDaysAllowed){
        await t.rollback();
        return res.status(400).json("data invalid");
      }
      const leaveApplication = await LeaveApplication.findByPk(
        leaveApplicationId
      );

      if (!leaveApplication) {
        await t.rollback();
        return res.status(400).json("leaveApplicationId not found");
      }
      if(leaveApplication.numberOfDaysOff < numberOfDaysAllowed){
        await t.rollback();
        return res.status(400).json("number of days allowed greater than number of days off");
      }

      await leaveApplication.update({
        isApprove,
        numberOfDaysAllowed,
      },{transaction: t});
      await leaveApplication.reload();

      const leaveApplicationDetailsData = [];

      for(let day = 0; day < leaveApplication.numberOfDaysOff; day++){
        leaveApplicationDetailsData.push({
            employeeId: leaveApplication.employeeId,
            date: addDays(leaveApplication.startDate,day),
            havePay: day < numberOfDaysAllowed,
        })
      }
      const leaveApplicationDetails = await LeaveApplicationDetail.bulkCreate(leaveApplicationDetailsData,{transaction: t});

      await t.commit();
      res.status(200).json({leaveApplication,leaveApplicationDetails});
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(500).json(error);
    }
  },
};

module.exports = LeaveApplicationController;
