import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import IngredientConsumedHeader from "./IngredientConsumedHeader";
import IngredientConsumedContent from "./IngredientConsumedContent";

const IngredientConsumedContainer = () => {
  const ContentContainer = styled("div")({
    flexGrow: 1,
    padding: "10px", // Add padding for better spacing
    marginLeft: "-60px", // Adjust the margin to offset the sidebar width
  });

  return (
    <ContentContainer>
      <IngredientConsumedHeader />
      <IngredientConsumedContent />
    </ContentContainer>
  );
};

export default IngredientConsumedContainer;
