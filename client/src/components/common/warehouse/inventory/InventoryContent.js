import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import SearchInput from "../../admin/SearchInput";
import FilterButtonGroup from "../../admin/FilterButtonGroup";
import InventoryHeader from "./InventoryHeader";
import InventoryTable from "./InventoryTable";
import { fetchAllInventory } from "../../../../services/UserService";

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

  const [items, setItems] = useState([]);
  const fetchInventoryData = () => {
    fetchAllInventory()
      .then((response) => {
        console.log("Check warehouse: ", response);
        setItems(response);
      })
      .catch((error) => {
        console.log("Check error");
      });
  };
  useEffect(() => {
    fetchInventoryData();
  }, []);
  return (
    <ContentContainer>
      <InventoryHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <SearchInput />
      </div>
      <InventoryTable items={items} fetchInventoryData={fetchInventoryData} />
    </ContentContainer>
  );
}
