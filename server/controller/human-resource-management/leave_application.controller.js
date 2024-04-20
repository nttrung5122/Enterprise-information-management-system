const { Op } = require("sequelize");
const moment = require("moment");

const { LeaveApplication, sequelize, LeaveApplicationDetail, TimeKeeping, Employee } = require("../../models");

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
  calInMonth: async (year,month)=>{
    const startOfMonth = moment(`${year}/${month}/01`).format('YYYY/MM/DD');
    const endOfMonth = moment(`${year}/${month}/01`).endOf('month').format('YYYY/MM/DD');
    const timekeepings = await TimeKeeping.findAll({
      where:{
        date: {
          [Op.between]: [startOfMonth, endOfMonth]
        }
      }
    })
    const employees = await Employee.findAll();
    const dataStatistics = employees.reduce((prevalue, curvalue) =>{
      prevalue[curvalue.id] = {
        totalDaysOff: 0,
        totalWorkingDay: 0
      }
      return prevalue;
    },{})

    timekeepings.forEach((timekeeping) => {
      if(timekeeping.haveWorking)
        dataStatistics[timekeeping.employeeId].totalWorkingDay ++;
      else
        dataStatistics[timekeeping.employeeId].totalDaysOff ++;
    })
    for (const key in dataStatistics) {
      if (dataStatistics[key].totalWorkingDay == 0 && dataStatistics[key].totalDaysOff == 0) {
        delete dataStatistics[key];
      }
    }
    return dataStatistics;
  },
  calInYear: async (year)=>{
    const startOfYear = moment(`${year}/01/01`).format('YYYY/MM/DD');
    const endOfYear = moment(`${year}/01/01`).endOf('year').format('YYYY/MM/DD');
    const timekeepings = await TimeKeeping.findAll({
      where:{
        date: {
          [Op.between]: [startOfYear, endOfYear]
        }
      }
    })
    const employees = await Employee.findAll();
    const dataStatistics = employees.reduce((prevalue, curvalue) =>{
      prevalue[curvalue.id] = {
        totalDaysOff: 0,
        totalWorkingDay: 0
      }
      return prevalue;
    },{})

    timekeepings.forEach((timekeeping) => {
      if(timekeeping.haveWorking)
        dataStatistics[timekeeping.employeeId].totalWorkingDay ++;
      else
        dataStatistics[timekeeping.employeeId].totalDaysOff ++;
    })
    for (const key in dataStatistics) {
      if (dataStatistics[key].totalWorkingDay == 0 && dataStatistics[key].totalDaysOff == 0) {
        delete dataStatistics[key];
      }
    }
    return dataStatistics;
  },
  statisticsInMonth: async (req,res) => {
    try {
      const month= req.query?.month;
      const year= req.query?.year;
      if(!month || !year){
        return res.status(403).json("Data is invalid");
      }
      console.log(13);
      const data = await LeaveApplicationController.calInMonth(year,month);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticsInYear: async (req,res) => {
    try {
      const year= req.query?.year;
      if(!year){
        return res.status(403).json("Data is invalid");
      }
      const data = await LeaveApplicationController.calInYear(year);
      res.status(200).json(data);

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticsEachMonth: async (req,res) => {
    try {
      const year= req.query?.year;
      if(!year){
        return res.status(403).json("Data is invalid");
      }
      const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
      const data = await Promise.all(monthArr.map((month)=>{
        return LeaveApplicationController.calInMonth(year,month)
      }))
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

module.exports = LeaveApplicationController;
