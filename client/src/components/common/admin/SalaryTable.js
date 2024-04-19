import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
  const { row, year, salaries } = props;
  const [open, setOpen] = React.useState(false);

  const handleToggleCollapse = () => {
    setOpen(!open);
    console.log("Check year: ", year);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleToggleCollapse}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.id}</TableCell>
        <TableCell align="center">{row.fullname}</TableCell>
        <TableCell align="center">
          {row.employee_statuses &&
            row.employee_statuses[0] &&
            row.employee_statuses[0].role &&
            row.employee_statuses[0].role.info}
        </TableCell>
        <TableCell align="center">
          {row.employee_statuses &&
            row.employee_statuses[0] &&
            row.employee_statuses[0].role &&
            row.employee_statuses[0].role.baseSalary}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                style={{ marginRight: "16px" }}
              >
                Bảng lương năm {year}
              </Typography>
            </Box>
            {/* Rest of your collapse content */}
            <Table aria-label="salaries">
              <TableHead>
                <TableRow>
                  <TableCell>Tháng</TableCell>
                  <TableCell>Nghỉ phép</TableCell>
                  <TableCell>Ngày làm việc</TableCell>
                  <TableCell>Tổng số ngày lương</TableCell>
                  <TableCell>Tổng lương</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salaries &&
                  salaries.map((salaryData, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{salaryData.countOfDayOffWithPay}</TableCell>
                      <TableCell>{salaryData.countOfWorkingDay}</TableCell>
                      <TableCell>{salaryData.totalPaidDay}</TableCell>
                      <TableCell>{salaryData.salary}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    countOfDayOffWithPay: PropTypes.number.isRequired,
    countOfWorkingDay: PropTypes.number.isRequired,
    employeeId: PropTypes.number.isRequired,
    employeeName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    baseSalary: PropTypes.number.isRequired,
    salary: PropTypes.number.isRequired,
    totalPaidDay: PropTypes.number.isRequired,
  }).isRequired,
  year: PropTypes.number.isRequired, // Add prop type for handleChangeYear
};

export const SalaryTable = ({ users, year, salaries }) => {
  console.log("Check salaries: ", salaries);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Tên nhân viên</TableCell>
            <TableCell align="center">Vị trí</TableCell>
            <TableCell align="center">Lương căn bản</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <React.Fragment key={user.employeeId}>
              <Row row={user} year={year} salaries={salaries[index]} />
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={7}
                >
                  <Collapse in={false} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" gutterBottom component="div">
                        History
                      </Typography>
                      {/* Render additional details if needed */}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

SalaryTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      countOfDayOffWithPay: PropTypes.number.isRequired,
      countOfWorkingDay: PropTypes.number.isRequired,
      employeeId: PropTypes.number.isRequired,
      employeeName: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      baseSalary: PropTypes.number.isRequired,
      salary: PropTypes.number.isRequired,
      totalPaidDay: PropTypes.number.isRequired,
    })
  ).isRequired,
  year: PropTypes.number.isRequired, // Add prop type for handleChangeYear
};
