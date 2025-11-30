import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import StatisticHeader from "./StatisticHeader";
import StatisticContent from "./StatisticContent";

export default function StatisticContainer() {
  const ContentContainer = styled("div")({
    flexGrow: 1,
    padding: "10px",
    marginLeft: "-60px",
    paddingBottom: "80px", // Add padding to prevent cutoff from bottom navigation
  });

  return (
    <ContentContainer sx={{ p: 3, mb: 3, pb: 10 }}>
      <StatisticHeader />
      <StatisticContent />
    </ContentContainer>
  );
}
