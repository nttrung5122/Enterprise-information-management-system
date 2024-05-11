import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const WorkCalendar = ({ checkInData }) => {
  const totalWorkedDate = checkInData.filter((data) => data.haveWorking).length;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Ngày</TableCell>
            <TableCell align="right">Trạng thái:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkInData.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">
                {row.haveWorking ? "Có" : "Nghỉ"}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={1}>Tổng số ngày làm việc:</TableCell>
            <TableCell align="left">{totalWorkedDate}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
