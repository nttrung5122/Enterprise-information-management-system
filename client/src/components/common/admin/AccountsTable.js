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
import { ChangePasswordModal } from "../modal/ChangePasswordModal";

const AccountsTable = ({ users }) => {
  const handleDelete = (employeeId) => {
    console.log("Check user id: ", employeeId);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Tài khoản</TableCell>
            <TableCell align="center">ID nhân viên</TableCell>
            <TableCell align="center">Thuộc nhân viên</TableCell>
            <TableCell align="center">Trạng thái</TableCell>
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
                <TableCell align="center">
                  {user.employee_statuses.length > 0 &&
                    user.employee_statuses[0].employeeId}
                </TableCell>
                <TableCell align="center">{user.fullname}</TableCell>
                <TableCell align="center">
                  {user.isWorking ? "Đang làm việc" : "Không"}
                </TableCell>

                <TableCell align="center" width={200}>
                  <Box mx={2}>
                    <ChangePasswordModal id={user.id} />
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

export default AccountsTable;
