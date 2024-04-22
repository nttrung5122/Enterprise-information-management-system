import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";

import RecipeHeader from "./RecipeHeader";
import { fetchAllRecipe } from "../../../../services/BusinessService";
import RecipeContent from "./RecipeContent";

export default function RecipeContainer() {
  const ContentContainer = styled("div")({
    flexGrow: 1,
    padding: "10px", // Add padding for better spacing
    marginLeft: "-60px", // Adjust the margin to offset the sidebar width
  });

  const FilterGroupContainer = styled("div")({
    display: "flex",
    alignItems: "center",
  });

  const [items, setItems] = useState([]);
  const fetchRecipeData = () => {
    fetchAllRecipe()
      .then((response) => {
        console.log("Check recipe: ", response);
        setItems(response);
      })
      .catch((error) => {
        console.log("Check error");
      });
  };
  useEffect(() => {
    fetchRecipeData();
  }, []);
  return (
    <ContentContainer>
      <RecipeHeader fetchRecipeData={fetchRecipeData} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <RecipeContent items={items} fetchRecipeData={fetchRecipeData} />
      </div>
    </ContentContainer>
  );
}
