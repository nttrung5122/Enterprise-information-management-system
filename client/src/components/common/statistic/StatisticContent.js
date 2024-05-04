import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";

import ProfitContainer from "./ProfitContainer";
import Paper from "@mui/material/Paper";
import RevenueContainer from "./RevenueContainer";

const StatisticContent = () => {
  return (
    <Container sx={{ mt: 2, ml: 2 }}>
      <Paper elevation={5} sx={{ padding: 2, width: 250, ml: 3 }}>
        {" "}
        <Typography variant="h5">Thống kê lợi nhuận</Typography>
      </Paper>

      <ProfitContainer />
      <Paper elevation={5} sx={{ padding: 2, width: 250, ml: 3, mt: 2 }}>
        {" "}
        <Typography variant="h5">Thống kê doanh thu</Typography>
      </Paper>
      <RevenueContainer />
    </Container>
  );
};

export default StatisticContent;
