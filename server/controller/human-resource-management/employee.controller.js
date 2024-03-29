const {
  Employee,
  EmployeeStatus,
  Role,
  Contract,
  Account,
  TimeKeeping,
  sequelize,
  LeaveApplicationDetail,
} = require("../../models");
const { Op } = require("sequelize");
const moment = require("moment");
const bcrypt = require("bcrypt");
const {
  BUSINESS_MANAGE_PERMISSION,
} = require("../../constants/permission.const");

const EmployeeController = {
  getAllEmployee: async (req, res) => {
    try {
      const employee = await Employee.findAll({
        include: {
          model: EmployeeStatus,
          include: Role,
        },
      });
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params?.id;
      const employee = await Employee.findByPk(id, {
        include: {
          model: EmployeeStatus,
          include: Role,
        },
      });
      if (!employee) {
        return res.status(404).json("id not found");
      }
      res.status(200).json(employee);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  updateRole: async (req, res) => {
    try {
      const { employeeId, roleId, salaryScale, date } = req.body;

      console.log(employeeId, roleId, salaryScale);
      if (!employeeId || !roleId || !salaryScale || !date) {
        return res.status(403).json("Data is invalid");
      }
      //ToDo: check date valid
      //   if(!moment(date, "MM/DD/YYYY", true).isValid() || ){

      //   }
      const dateFormat = moment(date).format();
      const employee = await Employee.findByPk(employeeId);
      const role = await Role.findByPk(roleId);
      if (!employee || !role) {
        return res.status(403).json("Data is invalid");
      }

      const employeeRoleCurrent = await EmployeeStatus.findOne({
        where: {
          employeeId: employeeId,
          endDate: null,
        },
      });
      if (
        employeeRoleCurrent.roleId == roleId &&
        employeeRoleCurrent.salaryScale == salaryScale
      ) {
        console.log(employeeRoleCurrent);
        return res.status(403).json("Data is invalid");
      }
      // console.log(Date.parse(employeeRoleCurrent.startDate)-Date.parse(date))
      if (moment(employeeRoleCurrent.startDate).isAfter(date, "month")) {
        // date smaller than start date
        return res.status(403).json("Data is invalid");
      }
      const endDate = moment(date).subtract(1, "month");
      await employeeRoleCurrent.update({ endDate });
      await EmployeeStatus.create({
        employeeId,
        roleId,
        salaryScale: salaryScale,
        startDate: dateFormat,
      });
      const newEmployee = await Employee.findByPk(employeeId, {
        include: {
          model: EmployeeStatus,
          include: Role,
        },
      });
      return res.status(200).json(newEmployee);
      // return res.status(200).json("ok");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  addEmployee: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { employeeInfo, contractInfo, employeeRole } = req.body;

      const checkEmployeeInfoValid = (data) => {
        if (
          data?.fullname &&
          data?.idCode &&
          data?.hireDate
          //ToDo: check date valid
          //   && moment(data?.hireDate, "MM/DD/YYYY", true).isValid()
        )
          return true;
        return false;
      };

      const checkContractInfoValid = (data) => {
        if (
          data?.endDate
          //ToDo: check date valid
          // && moment(data?.endDate, "MM/DD/YYYY", true).isValid()
        )
          return true;
        return false;
      };

      const checkRoleValid = (data) => {
        if (data?.salaryScale && data?.roleId) {
          return true;
        }
        return false;
      };

      if (
        !checkContractInfoValid(contractInfo) ||
        !checkRoleValid(employeeRole) ||
        !checkEmployeeInfoValid(employeeInfo)
      ) {
        return res.status(402).json("Data is invalid");
      }
      contractInfo.endDate = moment(contractInfo.endDate).format();
      employeeInfo.hireDate = moment(employeeInfo.hireDate).format();
      const role = await Role.findByPk(employeeRole?.roleId);

      if (!role) {
        return res.status(402).json("Data is invalid");
      }

      const employee = await Employee.create(employeeInfo);
      await Account.create(
        {
          employeeId: employee.id,
          password: "123456",
        },
        { transaction: transaction }
      );
      await Contract.create(
        {
          ...contractInfo,
          startDate: employee.hireDate,
          employeeId: employee.id,
        },
        { transaction: transaction }
      );
      await EmployeeStatus.create(
        {
          ...employeeRole,
          employeeId: employee.id,
          startDate: employee.hireDate,
        },
        { transaction: transaction }
      );
      const newEmployee = await Employee.findByPk(employee.id, {
        include: [Contract, { model: EmployeeStatus, include: Role }],
      });
      await transaction.commit();
      return res.status(200).json(newEmployee);
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return res.status(500).json(error);
    }
  },
  changeInfoEmployee: async (req, res) => {
    try {
      //TODO: can change email, number phone, address
      const { employeeId, email, phoneNumber, address } = req.body;
      if (!employeeId || !email || !phoneNumber || !address) {
        //TODO: check data validate
        return res.status(403).json("Data is invalid");
      }
      const employee = await Employee.findByPk(employeeId);
      if (!employee) {
        return res.status(403).json("Data is invalid");
      }
      await employee.update({ email, phoneNumber, address });

      return res.status(200).json(employee);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  deleteEmployee: async (req, res) => {
    // const transaction = await sequelize.transaction();
    try {
      //TODO: change isWorking, disable account, change employee status
      const employeeId = req.body?.employeeId;
      const date = req.body?.date;
      if (!employeeId || !date) {
        return res.status(403).json("Data is invalid");
      }
      const employee = await Employee.findByPk(employeeId);
      if (!employee) {
        return res.status(403).json("Data is invalid  56");
      }

      const employeeRoleCurrent = await EmployeeStatus.findOne({
        where: {
          employeeId: employeeId,
          endDate: null,
        },
      });
      if (!employeeRoleCurrent) {
        return res.status(403).json("Data is invalid");
      }
      if (Date.parse(employeeRoleCurrent.startDate) - Date.parse(date) >= 0) {
        // date smaller than start date
        return res.status(403).json("Data is invalid");
      }

      const account = await Account.findOne({ employeeId });
      if (account) {
        await account.update({ active: false });
      }

      await employee.update({ isWorking: false });

      await employeeRoleCurrent.update({ endDate: date });

      return res.status(200).json(employee);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  // manager check for staff members
  timekeeping: async (req, res) => {
    try {
      //TODO: foreach employee: check staff create timekeeping,
      const data = req.body?.data;
      if (!data) {
        return res.status(401).json("Data is invalid");
      }
      const checkDataValid = data.reduce(
        (previousValue, currentValue, currentIndex, array) => {
          return (
            previousValue && currentValue?.employeeId && currentValue?.date
          );
        },
        true
      );
      if (!checkDataValid) {
        return res.status(401).json("Data is invalid");
      }
      const timekeeping = await TimeKeeping.bulkCreate(data);
      res.status(200).json(timekeeping);
    } catch (error) {
      console.log(error);
      res.status(500).json("You have already checked in");
    }
  },
  // self check in for none normal staff
  checkInDaily: async (req, res) => {
    try {
      //TODO: check user and user are not staff,
      if (!req.session?.account)
        return res.status(403).json("you dont have permission");
      const timekeeping = await TimeKeeping.create({
        employeeId: req.session.account.id,
        date: moment(),
        haveWorking: true,
      });

      return res.status(200).json(timekeeping);
    } catch (error) {
      console.log(error);
      res.status(500).json("You have already checked in");
    }
  },
  calSalaryInMonth: async (year, month, employeeId, employeeName) => {
    const date = moment({
      y: year,
      M: month,
      day: 15,
    }).format("YYYY-MM-DD");
    const employeeStatus = await EmployeeStatus.findOne({
      where: {
        startDate: {
          [Op.lt]: date,
        },
        endDate: {
          [Op.or]: {
            [Op.is]: null,
            [Op.gt]: date,
          },
        },
        employeeId: employeeId,
      },
      include: [Role],
    });
    if (!employeeStatus) {
      return {
        employeeName,
        employeeId,
        countOfDayOffWithPay: 0,
        countOfWorkingDay: 0,
        totalPaidDay: 0,
        salary: 0,
      };
    }
    const baseSalary =
      employeeStatus.salaryScale * employeeStatus.role.baseSalary;

    const firstDay = moment({
      y: year,
      M: month,
    })
      .startOf("month")
      .format("YYYY-MM-DD");
    const lastDay = moment({
      y: year,
      M: month,
    })
      .endOf("month")
      .format("YYYY-MM-DD");
    const timekeeping = await TimeKeeping.findAll({
      where: {
        date: {
          [Op.lte]: lastDay,
          [Op.gte]: firstDay,
        },
        haveWorking: true,
        employeeId,
      },
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("employeeId")), "count"],
      ],
    });
    const countOfDaysOffAllowed = await LeaveApplicationDetail.findAll({
      where: {
        date: {
          [Op.lte]: lastDay,
          [Op.gte]: firstDay,
        },
        havePay: true,
        employeeId,
      },
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("employeeId")), "count"],
      ],
    });
    const countOfWorkingDay = timekeeping[0].getDataValue("count");
    const countOfDayOffWithPay = countOfDaysOffAllowed[0].getDataValue("count");
    const totalPaidDay = countOfWorkingDay + countOfDayOffWithPay;
    const salary = (totalPaidDay / 26) * baseSalary;
    // console.log(timekeeping)
    // console.log(employeeStatus)
    return {
      employeeName,
      employeeId,
      countOfDayOffWithPay,
      countOfWorkingDay,
      totalPaidDay,
      salary,
    };
  },
  calculateSalaryAllEmployeeInMonth: async (req, res) => {
    try {
      const month = req.query?.month;
      const year = req.query?.year;
      if (!month || !year) {
        return res.status(401).json("Data is invalid");
      }
      const employees = await Employee.findAll();
      const data = await Promise.all(
        employees.map((employee) => {
          return EmployeeController.calSalaryInMonth(year, month, employee.id, employee.fullname);
        })
      );

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  calculateMySalary: async (req, res) => {
    try {
      //TODO: get role, employee status, TimeKeeping
      //TODO: calculate salary of user
      const month = req.query?.month;
      const year = req.query?.year;
      const employeeId = req.query?.employeeId;
      if (!month || !year || !employeeId) {
        return res.status(401).json("Data is invalid");
      }
      const data = await EmployeeController.calSalaryInMonth(
        year,
        month,
        employeeId,
        req.session?.account.employee.fullname || "test"
      );

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  //need to optimize
  calSalaryInYear: async (year, employeeId,employeeName) => {
    const monthArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const data = await Promise.all(
      monthArr.map((month) => {
        return EmployeeController.calSalaryInMonth(year, month, employeeId,employeeName);
      })
    );
    const totalData = {
      employeeId,
      countOfDayOffWithPay: 0,
      countOfWorkingDay: 0,
      totalPaidDay: 0,
      salary: 0,
    };

    data.forEach((item) => {
      totalData.countOfDayOffWithPay += item.countOfDayOffWithPay;
      totalData.countOfWorkingDay += item.countOfWorkingDay;
      totalData.totalPaidDay += item.totalPaidDay;
      totalData.salary += item.salary;
    });
    return totalData;
  },
  calSalaryInYearOptimize: async (year, employeeId,employeeName) => {
    const firstDay = moment({
      y: year,
    })
      .startOf("year")
      .format("YYYY-MM-DD");
    const lastDay = moment({
      y: year,
    })
      .endOf("year")
      .format("YYYY-MM-DD");
    let employeeStatus = await EmployeeStatus.findAll({
      where: {
        employeeId,
        [Op.or]: [
          {
            startDate: {
              [Op.lte]: lastDay,
              [Op.gte]: firstDay,
            },
          },
          {
            endDate: {
              [Op.lte]: lastDay,
              [Op.gte]: firstDay,
            },
          },
        ],
      },
      include: [Role],
      order: ["startDate"],
    });

    if (!employeeStatus || !employeeStatus.length) {
      return {
        employeeName,
        employeeId,
        countOfDayOffWithPay: 0,
        countOfWorkingDay: 0,
        totalPaidDay: 0,
        salary: 0,
      };
    }
    const compareDates = (d1, d2) => {
      let date1 = new Date(d1).getTime();
      let date2 = new Date(d2).getTime();

      return date1 > date2;
    };

    employeeStatus = employeeStatus.map((status) => {
      const startDate = compareDates(status.startDate, firstDay)
        ? status.startDate
        : firstDay;

      const endDate =
        compareDates(status.endDate, lastDay) || !status.endDate
          ? lastDay
          : status.endDate;
      return {
        baseSalary: status.salaryScale * status.role.baseSalary,
        startDate,
        endDate,
      };
    });

    const timekeeping = await Promise.all(
      employeeStatus.map((status) => {
        return TimeKeeping.findAll({
          where: {
            date: {
              [Op.gte]: status.startDate,
              [Op.lte]: status.endDate,
            },
            haveWorking: true,
            employeeId,
          },
          attributes: [
            [sequelize.fn("COUNT", sequelize.col("employeeId")), "count"],
          ],
        });
      })
    );
    const countOfDaysOffAllowed = await Promise.all(
      employeeStatus.map((status) => {
        return LeaveApplicationDetail.findAll({
          where: {
            date: {
              [Op.gte]: status.startDate,
              [Op.lte]: status.endDate,
            },
            havePay: true,
            employeeId,
          },
          attributes: [
            [sequelize.fn("COUNT", sequelize.col("employeeId")), "count"],
          ],
        });
      })
    );

    const dataPerState = [];
    employeeStatus.forEach((value, index, array) => {
      const countOfWorkingDay = timekeeping[index][0].getDataValue("count");
      const countOfDayOffWithPay =
        countOfDaysOffAllowed[index][0].getDataValue("count");
      const totalPaidDay = countOfWorkingDay + countOfDayOffWithPay;
      const salary = (totalPaidDay / 26) * value.baseSalary;
      dataPerState.push({
        countOfWorkingDay,
        countOfDayOffWithPay,
        totalPaidDay,
        salary,
      });
    });
    const result = dataPerState.reduce(
      (previousValue, currentValue) => {
        previousValue.countOfDayOffWithPay += currentValue.countOfDayOffWithPay;
        previousValue.countOfWorkingDay += currentValue.countOfWorkingDay;
        previousValue.totalPaidDay += currentValue.totalPaidDay;
        previousValue.salary += currentValue.salary;
        return previousValue;
      },
      {
        employeeName,
        employeeId,
        countOfDayOffWithPay: 0,
        countOfWorkingDay: 0,
        totalPaidDay: 0,
        salary: 0,
      }
    );
    return result;
  },
  getSalaryAllEmployeeInYear: async (req, res) => {
    try {
      const year = req.query?.year;
      if (!year) {
        return res.status(401).json("Data is invalid");
      }
      const employees = await Employee.findAll();
      const data = await Promise.all(
        employees.map((employee) => {
          // return EmployeeController.calSalaryInYear(year, employee.id);
          return EmployeeController.calSalaryInYearOptimize(year, employee.id,employee.fulname);
        })
      );
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getMySalaryInYear: async (req, res) => {
    try {
      const year = req.query?.year;
      const employeeId = req.query?.employeeId;
      if (!year || !employeeId) {
        return res.status(401).json("Data is invalid");
      }
      const employee  = await Employee.findByPk(employeeId);
      if(!employee) return res.status(400).json("Employee not found");
      // const data = await EmployeeController.calSalaryInYear(year, employeeId);
      const data = await EmployeeController.calSalaryInYearOptimize(
        year,
        employeeId,
        employee.fullname
      );
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticMySalaryByMonth: async (req, res) => {
    try {
      const year = req.query?.year;
      const employeeId = req.query?.employeeId;
      if (!year || !employeeId) return res.status(400).json("Data is invalid");
      const employee  = await Employee.findByPk(employeeId);
      if(!employee) return res.status(400).json("Employee not found");
      const monthArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      const data = await Promise.all(
        monthArr.map((month) => {
          return EmployeeController.calSalaryInMonth(year, month, employeeId, employee.fullname);
        })
      );
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticMySalaryByYear: async (req, res) => {
    try {
      const {employeeId, ...yearObj} = req.query;
      const yearArr = Object.values(yearObj);
      if (!yearArr) return res.status(404).json("data is invalid");

      const employee  = await Employee.findByPk(employeeId);
      if(!employee) return res.status(400).json("Employee not found");

      const data = await Promise.all(
        yearArr.map((year) => {
          // return EmployeeController.calSalaryInYear(year, employeeId);
          return EmployeeController.calSalaryInYearOptimize(year, employeeId,employee.fullname);
        })
      );
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticAllEmployeeSalaryByYear: async (req, res) => {
    try {
      const yearArr = Object.values(req.query);
      if (!yearArr || !yearArr.length)
        return res.status(404).json("data is invalid");
      const employees = await Employee.findAll();
      const data = await Promise.all(
        employees.map((employee) => {
          return Promise.all(
            yearArr.map((year) => {
              // return EmployeeController.calSalaryInYear(year, employee.id);
              return EmployeeController.calSalaryInYearOptimize(
                year,
                employee.id,
                employee.fullname
              );
            })
          );
        })
      );
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  statisticAllEmployeeSalaryByMonth: async (req, res) => {
    try {
      const year = req.query?.year;
      if (!year) return res.status(404).json("data is invalid");
      const monthArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      const employees = await Employee.findAll();
      const data = await Promise.all(
        employees
          .map((employee) => {
            return Promise.all(
              monthArr.map((month) => {
                return EmployeeController.calSalaryInMonth(
                  year,
                  month,
                  employee.id,
                  employee.fullname
                );
              })
            ) 
          })
      );
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = EmployeeController;
