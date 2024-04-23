import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";

import FoodPageContent from "./FoodPageContent";
import { fetchAllFood } from "../../../../services/BusinessService";
import FoodPageHeader from "./FoodPageHeader";

export default function FoodPageContainer() {
  const ContentContainer = styled("div")({
    flexGrow: 1,
    padding: "10px", // Add padding for better spacing
    marginLeft: "-60px", // Adjust the margin to offset the sidebar width
  });

  const FilterGroupContainer = styled("div")({
    display: "flex",
    alignItems: "center",
  });

  const [food, setFood] = useState([]);
  const getAllFood = () => {
    fetchAllFood()
      .then((response) => {
        console.log("Check food data", response);
        setFood(response);
      })
      .catch((error) => {
        console.log("Check error fetching food", error);
      });
  };
  useEffect(() => {
    getAllFood();
  }, []);

  return (
    <ContentContainer>
      <FoodPageHeader getAllFood={getAllFood} />
      <FoodPageContent food={food} getAllFood={getAllFood} />
    </ContentContainer>
  );
}
