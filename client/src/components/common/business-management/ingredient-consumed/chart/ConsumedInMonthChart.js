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
import { getIngredientConsumedInMonth } from "../../../../../services/StatisticService";

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

const ConsumedInMonthChart = () => {
  const [data, setData] = useState(null);
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(4);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const fetchData = () => {
    console.log("Check year, month", year, month);
    getIngredientConsumedInMonth(year, month)
      .then((response) => {
        console.log("Check response: ", response);
        setData(response);
      })
      .catch((error) => {
        console.log("Check error fetching consumed data", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [year, month]);

  return (
    <>
      <div>
        <FormControl>
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={handleYearChange}>
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2024}>2024</MenuItem>
            {/* Add more years as needed */}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Month</InputLabel>
          <Select value={month} onChange={handleMonthChange}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            {/* Add more months as needed */}
          </Select>
        </FormControl>
      </div>

      <Table>
        <TableHead></TableHead>
        <TableBody>
          {" "}
          {data &&
            Object.entries(data).map(([month, monthData]) => (
              <Row key={month} month={month} data={monthData} />
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ConsumedInMonthChart;
