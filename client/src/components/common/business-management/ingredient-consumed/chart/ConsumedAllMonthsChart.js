import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
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
            {Object.keys(data).length} nguyên liệu
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
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Tên nguyên liệu
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Số lượng
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(data).map(([ingredientId, ingredient]) => (
                    <TableRow
                      key={ingredientId}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                      }}
                    >
                      <TableCell>{ingredient.ingredientId}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {ingredient.nameIngredient}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="medium">
                          {Math.ceil(ingredient.quantity)}
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

const ConsumedAllMonthsChart = () => {
  const [data, setData] = useState(null);
  const [year, setYear] = useState(2024);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = (selectedYear) => {
    setLoading(true);
    setError(null);
    getIngredientConsumedAllMonths(selectedYear)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.log("Check error fetching consumed data", error);
        setError("Không thể tải dữ liệu. Vui lòng thử lại.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(year);
  }, [year]);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <Container maxWidth={false} sx={{ py: 3, px: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="primary">
            Nguyên liệu đã sử dụng theo năm
          </Typography>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Năm</InputLabel>
            <Select value={year} onChange={handleYearChange} label="Năm">
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
              <MenuItem value={2025}>2025</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : !data || data.length === 0 ? (
          <Alert severity="info">Không có dữ liệu cho năm {year}</Alert>
        ) : (
          <TableContainer>
            <Table sx={{ width: "100%", tableLayout: "auto" }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "white" }}
                  ></TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold", width: "50%" }}
                  >
                    Tháng
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold", width: "50%" }}
                  >
                    Số lượng nguyên liệu
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((monthData) => (
                  <Row
                    key={monthData.month}
                    month={`Tháng ${monthData.month}`}
                    data={monthData.detail}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default ConsumedAllMonthsChart;
