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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const TableUsers = ({ users, updateUserData, fetchUsersData }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
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

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
    // Reset the pagination when changing tabs
    setPage(1);
  };

  // Filtering logic based on the selected tab
  const filteredUsers = users.filter((user) => {
    if (selectedTab === 0) return true; // All users
    if (selectedTab === 1) return user.isWorking; // Active users
    if (selectedTab === 2) return !user.isWorking; // Non-active users
  });

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "80%", mt: 2 }}
    >
      <Tabs value={selectedTab} onChange={handleChangeTab}>
        <Tab label="Tất cả" />
        <Tab label="Hoạt động" />
        <Tab label="Không hoạt động" />
      </Tabs>
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
            {filteredUsers.slice(startIndex, endIndex).map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">{user.id}</TableCell>
                <TableCell align="center">{user.fullname}</TableCell>
                <TableCell align="center">
                  {user.employee_statuses.length > 0 &&
                    user.employee_statuses
                      .filter((status) => status.endDate === null) // Filter by endDate === null
                      .map((status) => status.role.info)
                      .join(", ")}
                </TableCell>
                <TableCell align="center">
                  {user.employee_statuses.length > 0 &&
                    user.employee_statuses
                      .filter((status) => status.endDate === null) // Filter by endDate === null
                      .map((status) => status.role.baseSalary)
                      .join(", ")}
                </TableCell>
                <TableCell align="center">
                  {user.employee_statuses.length > 0 &&
                    user.employee_statuses
                      .filter((status) => status.endDate === null) // Filter by endDate === null
                      .map((status) => status.salaryScale)
                      .join(", ")}
                </TableCell>
                <TableCell align="center">
                  {user.employee_statuses.length > 0 &&
                    user.employee_statuses
                      .filter((status) => status.endDate === null) // Filter by endDate === null
                      .map((status) => status.startDate)
                      .join(", ")}
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
          count={Math.ceil(filteredUsers.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          sx={{ ml: 2, mt: 2 }}
        />
      </Box>
    </Box>
  );
};

export default TableUsers;
