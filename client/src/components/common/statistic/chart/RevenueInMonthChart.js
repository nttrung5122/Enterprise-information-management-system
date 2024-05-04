import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Modify the Row component to accept revenue data dynamically
const Row = ({ month, data }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      {/* Row for month */}
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{month}</TableCell>
      </TableRow>
      {/* Collapsible row for dates and revenues */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Ngày</TableCell>
                  <TableCell>Doanh thu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(data).map(([date, revenue]) => (
                  <TableRow key={date}>
                    <TableCell component="th" scope="row">
                      {date}
                    </TableCell>
                    <TableCell>{revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const RevenueInMonthChart = ({ revenueDayInMonth }) => {
  return (
    <Table>
      <TableHead></TableHead>
      <TableBody>
        {/* Iterate over the revenue data and create rows */}
        {revenueDayInMonth.map((monthData, index) => (
          <Row key={index} month={`Tháng ${index + 1}`} data={monthData} />
        ))}
      </TableBody>
    </Table>
  );
};

export default RevenueInMonthChart;
