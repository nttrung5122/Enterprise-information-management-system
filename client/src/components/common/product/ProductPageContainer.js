import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import ProductHeader from "./ProductHeader";
import ProductList from "./ProductList";

export default function ProductPageContainer() {
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
      <ProductHeader />

      <ProductList />
    </ContentContainer>
  );
}
