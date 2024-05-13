const { Employee, Account, TimeKeeping, EmployeeStatus } = require("../models");

const employeeMockupData = [
  {
    id: 102,
    fullname: "Nguyễn Văn A",
    email: "EMAIL@GMAIL.COM",
    phoneNumber: "123456789",
    address: "abc",
  },
  {
    id: 103,
    fullname: "abc234",
    email: "<EMAIL>",
    phoneNumber: "123456789",
    address: "abc",
  },
  {
    id: 104,
    fullname: "abc123",
    email: "<EMAIL>",
    phoneNumber: "123456789",
    address: "abc",
  },
];
const yearArr = [2023, 2022];
const monthArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const timeKeepingMockupData = employeeMockupData
  .map((employee) => {
    return yearArr.map((year) => {
      return monthArr.map((month) => {
        const arr = [];
        for (let i = 1; i < 20; i++) {
          arr.push({
            employeeId: employee.id,
            date: new Date(year, month, i),
            haveWorking: true,
          });
        }
        return arr;
      });
    });
  })
  .flat(Infinity);

// console.log(timeKeepingMockupData);
const employeeStatusMockupData = employeeMockupData
  .map((employee) => {
    return [
      {
        employeeId: employee.id,
        roleId: 203,
        startDate: new Date(2022, 7, 1),
        endDate: new Date(2023, 3, 1),
        salaryScale: 1.0,
      },
      {
        employeeId: employee.id,
        roleId: 201,
        startDate: new Date(2023, 4, 1),
        endDate: new Date(2023, 8, 1),
        salaryScale: 1.0,
      },
      {
        employeeId: employee.id,
        roleId: 203,
        startDate: new Date(2023, 9, 1),
        endDate: new Date(2024, 2, 1),
        salaryScale: 1.0,
      },
      {
        employeeId: employee.id,
        roleId: 202,
        startDate: new Date(2024, 3, 1),
        salaryScale: 1.0,
      },
    ];
  })
  .flat(Infinity);
// console.log(employeeStatusMockupData);
module.exports = async () => {
  await Employee.bulkCreate(employeeMockupData);
  await Account.bulkCreate(
    employeeMockupData.map((employee) => {
      return { employeeId: employee.id, password: "123" };
    })
  );
  await EmployeeStatus.bulkCreate(employeeStatusMockupData);
  await TimeKeeping.bulkCreate(timeKeepingMockupData);
};
