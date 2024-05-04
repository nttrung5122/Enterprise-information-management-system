import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Collapse,
  IconButton,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getFoodSoldAllMonth } from "../../../../../services/StatisticService";

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
                  <TableCell>ID</TableCell>
                  <TableCell>Tên món</TableCell>
                  <TableCell>Chi tiết</TableCell>
                  <TableCell>Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(data).map(([foodId, foodData]) => (
                  <TableRow key={foodId}>
                    <TableCell>{foodData.foodId}</TableCell>
                    <TableCell>{foodData.nameFood}</TableCell>
                    <TableCell>{foodData.info}</TableCell>
                    <TableCell>{foodData.quantity}</TableCell>
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

const SaleAllMonthsChart = () => {
  const [data, setData] = useState(null);
  const [year, setYear] = useState(2024);
  const fetchData = () => {
    getFoodSoldAllMonth(year)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.log("Check error fetching food sale data", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Table>
      <TableHead></TableHead>
      <TableBody>
        {data &&
          data.map((monthData) => (
            <Row
              key={monthData.month}
              month={`Tháng ${monthData.month}`}
              data={monthData.detail}
            />
          ))}
      </TableBody>
    </Table>
  );
};

export default SaleAllMonthsChart;
