import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AlertDialog from "./Modal/DeleteUserModal";
import EmployeeInfoModal from "./Modal/EmployeeInfoModal";
import UpdateContractModal from "./Modal/UpdateContractModal";

const TableUsers = ({ users, updateUserData }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCloseEditModal = () => {
    setSelectedUser(null); // Reset the selected user when modal is closed
  };

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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell align="center">{user.id}</TableCell>
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
                  <UpdateContractModal
                    selectedUser={user} // Pass the selected user
                    updateUserData={updateUserData}
                    handleClose={handleCloseEditModal}
                  />

                  <EmployeeInfoModal user={user} />
                  <AlertDialog userId={user.id} />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableUsers;
