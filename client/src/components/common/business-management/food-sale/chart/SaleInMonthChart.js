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
  Paper,
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getFoodSoldAllDayInMonth } from "../../../../../services/StatisticService";

// Modify the Row component to accept revenue data dynamically
const Row = ({ month, data }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      {/* Row for month */}
      <TableRow
        sx={{
          "&:hover": { backgroundColor: "#f5f5f5" },
          cursor: "pointer",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle1" fontWeight="medium">
            {month}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" color="text.secondary">
            {Object.keys(data).length} món ăn
          </Typography>
        </TableCell>
      </TableRow>
      {/* Collapsible row for dates and revenues */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Tên món</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Chi tiết</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Số lượng
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(data).map(([foodId, foodData]) => (
                    <TableRow
                      key={foodId}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                      }}
                    >
                      <TableCell>{foodData.foodId}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {foodData.nameFood}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {foodData.info || "-"}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {foodData.quantity}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const SaleInMonthChart = () => {
  const [data, setData] = useState(null);
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const fetchData = () => {
    setLoading(true);
    setError(null);
    getFoodSoldAllDayInMonth(year, month)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.log("Check error fetching food sale data", error);
        setError("Không thể tải dữ liệu. Vui lòng thử lại.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [year, month]);

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  return (
    <Container maxWidth={false} sx={{ py: 3, px: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="primary">
            Doanh số theo tháng
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Năm</InputLabel>
              <Select value={year} onChange={handleYearChange} label="Năm">
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2025}>2025</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Tháng</InputLabel>
              <Select value={month} onChange={handleMonthChange} label="Tháng">
                {monthNames.map((name, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : !data || Object.keys(data).length === 0 ? (
          <Alert severity="info">
            Không có dữ liệu cho {monthNames[month - 1]} năm {year}
          </Alert>
        ) : (
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ fontWeight: "bold" }}></TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Ngày
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Số lượng món
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(data).map(([day, dayData]) => (
                <Row key={day} month={day} data={dayData} />
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
};

export default SaleInMonthChart;
