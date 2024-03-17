const {
  Employee,
  EmployeeStatus,
  Role,
  Contract,
  Account,
  TimeKeeping,
  sequelize,
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
      const id =  req.params?.id;
      const employee = await Employee.findByPk(id,{
        include:{
          model: EmployeeStatus,
          include: Role,
        }
      });
      if(!employee) {
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
        return res.status(403).json("Data is invalid 0");
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
        return res.status(403).json("Data is invalid 1");
      }
      // console.log(Date.parse(employeeRoleCurrent.startDate)-Date.parse(date))
      if (
        Date.parse(employeeRoleCurrent.startDate) - Date.parse(dateFormat) >=
        0
      ) {
        // date smaller than start date
        return res.status(403).json("Data is invalid 2");
      }
      await employeeRoleCurrent.update({ endDate: dateFormat });
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
      await Account.create({
        employeeId: employee.id,
        password:'123456' ,
      })
      await Contract.create({
        ...contractInfo,
        startDate: employee.hireDate,
        employeeId: employee.id,
      });
      await EmployeeStatus.create({
        ...employeeRole,
        employeeId: employee.id,
        startDate: employee.hireDate,
      });
      const newEmployee = await Employee.findByPk(employee.id, {
        include: [Contract, { model: EmployeeStatus, include: Role }],
      });

      return res.status(200).json(newEmployee);
    } catch (error) {
      console.log(error);
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
    try {
      //TODO: change isWorking, disable account, change employee status
      const employeeId = req.body?.employeeId;
      const date = req.body?.date;
      if (!employeeId || !date) {
        return res.status(403).json("Data is invalid");
      }
      const employee = await Employee.findByPk(employeeId);
      if (!employee) {
        return res.status(403).json("Data is invalid");
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
  calculateSalaryAllEmployeeInMonth: async (req, res) => {
    try {
      //TODO: check user is hr,
      const data = req.query?.month;
      if (!data) return res.status(401).json("Data is invalid");
      const date = new Date();
      const y = date.getFullYear(),
        m = date.getMonth();
      const firstDay = new Date(y, m, 0);
      const lastDay = new Date(y, m + 1, 1);
      console.log(firstDay, lastDay);

      //todo check role in time
      const employees = await Employee.findAll({
        include: [
          {
            model: EmployeeStatus,
            include: Role,
          },
        ],
      });
      const salaryPerEmp = employees.map((employee) => {
        const salary = employee.employee_statuses.reduce(
          (previousValue, currentValue) => {
            if (currentValue.endDate === null) {
              return currentValue.role.baseSalary * currentValue.salaryScale;
            }
            return previousValue;
          },
          0
        );
        return {
          employeeId: employee.id,
          salary,
        };
      });
      const timekeeping = await TimeKeeping.findAll({
        where: {
          date: {
            [Op.lt]: lastDay,
            [Op.gt]: firstDay,
          },
          haveWorking: true,
        },
        attributes: [
          "employeeId",
          [sequelize.fn("COUNT", sequelize.col("employeeId")), "count"],
        ],
        group: "employeeId",
      });
      const timekeepingMap = timekeeping.reduce(
        (previousValue, currentValue) => {
          previousValue[currentValue.employeeId] =
            currentValue.getDataValue("count");
          return previousValue;
        },
        {}
      );
      // const timekeepingMap =  new Map(timekeeping.map(i => [i.employeeId, i.count]));
      console.log(timekeepingMap);
      const salaryArray = salaryPerEmp.map((employee) => {
        const countDay = timekeepingMap[employee.employeeId]
          ? timekeepingMap[employee.employeeId]
          : 0;
        const scale = countDay != 0 ? countDay / 26 : 0;
        const salary = employee.salary * scale;
        return {
          employeeId: employee.employeeId,
          salaryBase: employee.salary,
          salary: Math.floor(salary),
          day: countDay,
        };
      });
      //TODO: get  all: role, employee status, TimeKeeping
      //TODO: calculate salary
      res.status(200).json(salaryArray);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  calculateMySalary: async (req, res) => {
    try {
      //TODO: get role, employee status, TimeKeeping
      //TODO: calculate salary of user
    } catch (error) {}
  },
  getSalaryAllInRange: async (req, res) => {
    try {
      //TODO: check user is hr
      //TODO: get range
      //TODO: get all role, employee status, TimeKeeping
      //TODO: calculate salary of user
    } catch (error) {}
  },
  getSalaryInRange: async (req, res) => {
    try {
      //TODO: get range
      //TODO: get role, employee status, TimeKeeping
      //TODO: calculate salary of user
    } catch (error) {}
  },
};

module.exports = EmployeeController;
