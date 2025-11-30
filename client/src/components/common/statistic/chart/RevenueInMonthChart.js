import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TableContainer from "@mui/material/TableContainer";

const Row = ({ month, data, isEmpty }) => {
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
            disabled={isEmpty} // Disable if no data
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          {month}
          {isEmpty && (
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              (Không có dữ liệu)
            </Typography>
          )}
        </TableCell>
      </TableRow>
      {/* Collapsible row for dates and revenues */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {isEmpty ? (
              <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                Không có dữ liệu cho tháng này
              </Typography>
            ) : (
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
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const RevenueInMonthChart = ({ revenueDayInMonth }) => {
  // Helper function to extract month number from date keys or use index
  const getMonthNumber = (monthData, index) => {
    // If monthData has data, extract month from first date
    if (monthData && Object.keys(monthData).length > 0) {
      const firstDate = Object.keys(monthData)[0];
      if (firstDate) {
        const month = parseInt(firstDate.split("/")[1]);
        return month;
      }
    }
    // If empty, return index + 1 (since array should be in order)
    return index + 1;
  };

  // Ensure we always show 12 months, even if some are empty
  const displayData =
    revenueDayInMonth && revenueDayInMonth.length > 0
      ? revenueDayInMonth
      : Array.from({ length: 12 }, () => ({}));

  return (
    <TableContainer sx={{ maxHeight: 600, overflow: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Tháng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Display all months, even if empty */}
          {displayData.map((monthData, index) => {
            const monthNumber = getMonthNumber(monthData, index);
            const monthLabel = `Tháng ${monthNumber}`;
            const isEmpty = !monthData || Object.keys(monthData).length === 0;

            return (
              <Row
                key={index}
                month={monthLabel}
                data={monthData}
                isEmpty={isEmpty}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default RevenueInMonthChart;
