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
import AlertDialog from "../modal/DeleteUserModal";
import EmployeeInfoModal from "../modal/EmployeeInfoModal";
import UpdateContractModal from "../modal/UpdateContractModal";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const TableUsers = ({ users, updateUserData, fetchUsersData }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleCloseEditModal = () => {
    setSelectedUser(null); // Reset the selected user when modal is closed
  };

  const handleDelete = (employeeId) => {
    console.log("Check user id: ", employeeId);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "80%" }}>
      <TableContainer component={Paper} sx={{ flex: 1 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Họ và tên</TableCell>
              <TableCell align="center">Chức vụ</TableCell>
              <TableCell align="center">Lương căn bản</TableCell>
              <TableCell align="center">Hệ số lương</TableCell>
              <TableCell align="center">Tháng bắt đầu</TableCell>

              <TableCell align="center">Điều chỉnh:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(startIndex, endIndex).map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">{user.id}</TableCell>
                <TableCell align="center">{user.fullname}</TableCell>
                <TableCell align="center">
                  {user.employee_statuses.length > 0 &&
                    (user.employee_statuses[0].endDate === null
                      ? user.employee_statuses[0].role.info
                      : user.employee_statuses[
                          user.employee_statuses.length - 1
                        ].role.info)}
                </TableCell>
                <TableCell align="center">
                  {user.employee_statuses.length > 0 &&
                    user.employee_statuses[0].role.baseSalary}
                </TableCell>
                <TableCell align="center">
                  {user.employee_statuses.length > 0 &&
                    user.employee_statuses[0].salaryScale}
                </TableCell>
                <TableCell align="center">
                  {user.employee_statuses.length > 0 &&
                    new Date(
                      user.employee_statuses[0].startDate
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                    })}
                </TableCell>
                <TableCell align="center" size="small">
                  <Box display="flex" alignItems="center" width={100} mx={2}>
                    <UpdateContractModal
                      selectedUser={user} // Pass the selected user
                      updateUserData={updateUserData}
                      handleClose={handleCloseEditModal}
                      fetchUsersData={fetchUsersData}
                    />
                    <EmployeeInfoModal
                      user={user}
                      fetchUsersData={fetchUsersData}
                    />
                    {user.isWorking && (
                      <AlertDialog
                        userId={user.id}
                        fetchUsersData={fetchUsersData}
                      />
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="rows-per-page-label">Số dòng</InputLabel>
          <Select
            labelId="rows-per-page-label"
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          count={Math.ceil(users.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          sx={{ ml: 2, mt: 2 }}
        />
      </Box>
    </Box>
  );
};

export default TableUsers;
