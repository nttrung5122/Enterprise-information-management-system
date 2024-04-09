import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import SearchInput from "../common/SearchInput";
import FilterButtonGroup from "../common/FilterButtonGroup";
import InventoryHeader from "./InventoryHeader";
import { getAllIngredients } from "../../services/UserService";
import InventoryTable from "./InventoryTable";

export default function InventoryContent() {
  const ContentContainer = styled("div")({
    flexGrow: 1,
    padding: "10px", // Add padding for better spacing
    marginLeft: "-60px", // Adjust the margin to offset the sidebar width
  });

  const FilterGroupContainer = styled("div")({
    display: "flex",
    alignItems: "center",
  });

  const [ingredients, setIngredients] = useState([]);
  const fetchIngredientsData = () => {
    getAllIngredients()
      .then((response) => {
        console.log("Check data: ", response);
        setIngredients(response);
      })
      .catch((error) => {
        console.log("Check error: ", error);
      });
  };
  useEffect(() => {
    fetchIngredientsData();
  }, []);
  return (
    <ContentContainer>
      <InventoryHeader fetchIngredientsData={fetchIngredientsData} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <SearchInput />
        <FilterGroupContainer>
          <FilterButtonGroup style={{ border: "1px groove grey" }} />
        </FilterGroupContainer>
      </div>
      <InventoryTable
        ingredients={ingredients}
        setIngredients={setIngredients}
        fetchIngredientsData={fetchIngredientsData}
      />
    </ContentContainer>
  );
}
