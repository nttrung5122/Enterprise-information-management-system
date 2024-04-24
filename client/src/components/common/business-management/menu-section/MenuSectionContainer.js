import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";

import MenuSectionHeader from "./MenuSectionHeader";
import MenuSectionContent from "./MenuSectionContent";
import { fetchAllMenuSection } from "../../../../services/BusinessService";

export default function MenuSectionContainer() {
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
  const getAllMenuSection = () => {
    fetchAllMenuSection()
      .then((response) => {
        console.log("Check recipe: ", response);
        setItems(response);
      })
      .catch((error) => {
        console.log("Check error");
      });
  };
  useEffect(() => {
    getAllMenuSection();
  }, []);
  return (
    <ContentContainer>
      <MenuSectionHeader getAllMenuSection={getAllMenuSection} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MenuSectionContent
          items={items}
          getAllMenuSection={getAllMenuSection}
        />
      </div>
    </ContentContainer>
  );
}
