import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import {
  getRevenueAllMonths,
  getRevenueInYear,
} from "../../../services/StatisticService";
import Paper from "@mui/material/Paper";
import YearSelectFilter from "./button/YearSelectFilter";

import RevenueInYearChart from "./chart/RevenueInYearChart";
import RevenueInMonthChart from "./chart/RevenueInMonthChart";

const RevenueContainer = () => {
  const [revenueInYear, setRevenueInYear] = useState(null);
  const [revenueDayInMonth, setRevenueDayInMonth] = useState(null);
  const [year, setYear] = useState(2024); // Initial year

  const fetchRevenueInYear = () => {
    getRevenueAllMonths(year)
      .then((response) => {
        setRevenueInYear(response);
      })
      .catch((error) => {
        console.log("Error fetching the revenue for the year:", error);
      });
  };
  const fetchRevenueInMonth = () => {
    getRevenueInYear(year)
      .then((response) => {
        setRevenueDayInMonth(response);
      })
      .catch((error) => {
        console.log("Error fetching the revenue for the month:", error);
      });
  };

  useEffect(() => {
    fetchRevenueInYear();
    fetchRevenueInMonth();
  }, [year]); // Fetch data when year or month changes

  const handleYearChange = (selectedYear) => {
    setYear(selectedYear);
  };

  return (
    <Container sx={{ mt: 2 }}>
      <YearSelectFilter onYearChange={handleYearChange} />
      <Grid container spacing={1} sx={{ mt: 2 }}>
        {/* First Column: Yearly Profit Statistics */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2, width: 700 }}>
            <Typography variant="h5" gutterBottom>
              Doanh thu trong năm {year}
            </Typography>

            {revenueInYear !== null ? (
              <RevenueInYearChart revenueInYear={revenueInYear} />
            ) : (
              <Typography variant="h6">Loading...</Typography>
            )}
          </Paper>
        </Grid>

        {/* Second Column: Monthly Profit Statistics */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Paper elevation={3} sx={{ padding: 2, width: 800 }}>
            <Typography variant="h5" gutterBottom>
              Doanh thu trong tháng của năm {year}
            </Typography>
            {revenueDayInMonth !== null ? (
              <RevenueInMonthChart revenueDayInMonth={revenueDayInMonth} />
            ) : (
              <Typography variant="h6">Loading...</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RevenueContainer;
