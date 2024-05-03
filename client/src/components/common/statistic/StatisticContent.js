import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import {
  getProfitAllMonths,
  getProfitInYear,
} from "../../../services/StatisticService";
import Paper from "@mui/material/Paper";
import YearSelectFilter from "./button/YearSelectFilter";

import ProfitInYearChart from "./chart/ProfitInYearChart";
import ProfitInAllMonthsChart from "./chart/ProfitInAllMonthsChart";

const StatisticContent = () => {
  const [profitInYear, setProfitInYear] = useState(null);
  const [profitAllMonths, setProfitAllMonths] = useState(null);
  const [year, setYear] = useState(2024); // Initial year

  const fetchProfitInYear = () => {
    getProfitInYear(year)
      .then((response) => {
        setProfitInYear(response);
      })
      .catch((error) => {
        console.log("Error fetching the profit for the year:", error);
      });
  };
  const fetchProfitAllMonths = () => {
    getProfitAllMonths(year)
      .then((response) => {
        setProfitAllMonths(response);
      })
      .catch((error) => {
        console.log("Error fetching the profit for the all months:", error);
      });
  };

  useEffect(() => {
    fetchProfitInYear();
    fetchProfitAllMonths();
  }, [year]); // Fetch data when year changes

  const handleYearChange = (selectedYear) => {
    setYear(selectedYear);
  };

  return (
    <Container sx={{ mt: 2, ml: 2 }}>
      <YearSelectFilter onYearChange={handleYearChange} />
      <Grid container spacing={1} sx={{ mt: 2 }}>
        {/* First Column: Yearly Profit Statistics */}
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ padding: 2, width: 500 }}>
            <Typography variant="h5" gutterBottom>
              Thống kê theo năm {year}
            </Typography>

            {profitInYear !== null ? (
              <ProfitInYearChart profitInYear={profitInYear} />
            ) : (
              <Typography variant="h6">Loading...</Typography>
            )}
          </Paper>
        </Grid>

        {/* Second Column: Monthly Profit Statistics */}
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ padding: 2, width: 800 }}>
            <Typography variant="h5" gutterBottom>
              Thống kê theo tháng năm {year}
            </Typography>

            {profitAllMonths !== null ? (
              <ProfitInAllMonthsChart profitAllMonths={profitAllMonths} />
            ) : (
              <Typography variant="h6">Loading...</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StatisticContent;
