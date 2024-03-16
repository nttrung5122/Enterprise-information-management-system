import * as React from "react";
import { useEffect, useState } from "react"; // Import useEffect and useState
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchAllUsers } from "../../services/UserService";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import BorderColorIcon from "@mui/icons-material/BorderColor";
const TableUsers = (props) => {
  const [users, setUsers] = useState([]); // State to store users data

  useEffect(() => {
    fetchAllUsers()
      .then((response) => {
        console.log("Check data >>>>:", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array means this effect runs once after the first render

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Họ và tên</TableCell>
            <TableCell align="center">Địa chỉ</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Số điện thoại</TableCell>
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
                <TableCell align="center">{user.address}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phoneNumber}</TableCell>
                <TableCell align="center">
                  <Button>
                    <BorderColorIcon />
                  </Button>
                  <Button color="error">
                    <PersonRemoveIcon />
                  </Button>
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
