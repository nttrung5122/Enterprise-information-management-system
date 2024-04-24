import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { fetchAllMenu } from "../../../../services/BusinessService";
import MenuHeader from "./MenuHeader";
import MenuContent from "./MenuContent";

export default function MenuContainer() {
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
  const getAllMenu = () => {
    fetchAllMenu()
      .then((response) => {
        console.log("Check menu: ", response);
        setItems(response);
      })
      .catch((error) => {
        console.log("Check error");
      });
  };
  useEffect(() => {
    getAllMenu();
  }, []);
  return (
    <ContentContainer>
      <MenuHeader getAllMenu={getAllMenu} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MenuContent items={items} getAllMenu={getAllMenu} />
      </div>
    </ContentContainer>
  );
}
