import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import TimeKeepingHeader from "./TimeKeepingHeader";
import TimeKeepingTable from "./TimeKeepingTable";

export default function TimeKeepingContent() {
  const ContentContainer = styled("div")({
    flexGrow: 1,
    padding: "10px", // Add padding for better spacing
    marginLeft: "-60px", // Adjust the margin to offset the sidebar width
  });

  const FilterGroupContainer = styled("div")({
    display: "flex",
    alignItems: "center",
  });

  return (
    <ContentContainer>
      <TimeKeepingHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      ></div>
      <TimeKeepingTable />
    </ContentContainer>
  );
}
