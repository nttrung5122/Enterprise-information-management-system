import React from "react";
import { styled } from "@mui/system";

import ProductDrawer from "../common/product/ProductDrawer";
import ProductPageContainer from "../common/product/ProductPageContainer";

const Container = styled("div")({
  display: "flex",
});
const FoodListingPage = () => {
  return (
    <Container>
      <ProductDrawer />
      <ProductPageContainer />
    </Container>
  );
};
export default FoodListingPage;
