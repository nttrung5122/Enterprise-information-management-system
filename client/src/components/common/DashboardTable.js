import * as React from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AlertDialog from "./Modal/DeleteUserModal";
import EmployeeInfoModal from "./Modal/EmployeeInfoModal";
import EditEmployeeModal from "./Modal/EditEmployeeModal";

const TableUsers = ({ users }) => {
  const handleDelete = (employeeId) => {
    console.log("Check user id: ", employeeId);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Họ và tên</TableCell>
            <TableCell align="center">Chức vụ</TableCell>
            <TableCell align="center">Lương căn bản</TableCell>
            <TableCell align="center">Hệ số lương</TableCell>
            <TableCell align="center">Điều chỉnh:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(
            (
              user // Iterate over users array
            ) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {user.id}
                </TableCell>
                <TableCell align="center">{user.fullname}</TableCell>
                <TableCell align="center">
                  {user.employee_statuses.length > 0 &&
                    user.employee_statuses[0].role.info}
                </TableCell>
                <TableCell align="center">
                  {user.employee_statuses.length > 0 &&
                    user.employee_statuses[0].role.baseSalary}
                </TableCell>
                <TableCell align="center">
                  {user.employee_statuses.length > 0 &&
                    user.employee_statuses[0].salaryScale}
                </TableCell>
                <TableCell align="center" size="small">
                  <Box display="flex" alignItems="center" width={100} mx={2}>
                    <EditEmployeeModal />
                    <EmployeeInfoModal employee={user} />
                    <AlertDialog userId={user.id} />
                  </Box>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableUsers;
