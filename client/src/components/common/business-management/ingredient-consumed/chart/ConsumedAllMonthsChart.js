import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Collapse,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getIngredientConsumedAllMonths } from "../../../../../services/StatisticService";

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
                  <TableCell>Tên nguyên liệu</TableCell>
                  <TableCell>Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(data).map(([ingredientId, ingredient]) => (
                  <TableRow key={ingredientId}>
                    <TableCell>{ingredient.ingredientId}</TableCell>
                    <TableCell>{ingredient.nameIngredient}</TableCell>
                    <TableCell>{ingredient.quantity}</TableCell>
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

const ConsumedAllMonthsChart = () => {
  const [data, setData] = useState(null);
  const [year, setYear] = useState(2024);

  const fetchData = (selectedYear) => {
    getIngredientConsumedAllMonths(selectedYear)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.log("Check error fetching consumed data", error);
      });
  };

  useEffect(() => {
    fetchData(year);
  }, [year]);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <>
      <FormControl>
        <InputLabel>Year</InputLabel>
        <Select value={year} onChange={handleYearChange}>
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2024}>2024</MenuItem>
          {/* Add more years as needed */}
        </Select>
      </FormControl>

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
    </>
  );
};

export default ConsumedAllMonthsChart;
