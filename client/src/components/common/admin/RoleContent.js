import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";

import RoleHeader from "./RoleHeader";

import RoleTable from "./RoleTable";
import { getAllRole } from "../../../services/UserService";

export default function RoleContent() {
  const ContentContainer = styled("div")({
    flexGrow: 1,
    padding: "10px", // Add padding for better spacing
    marginLeft: "-60px", // Adjust the margin to offset the sidebar width
  });

  const FilterGroupContainer = styled("div")({
    display: "flex",
    alignItems: "center",
  });

  const [role, setAllRole] = useState([]);
  const fetchAllRole = () => {
    getAllRole()
      .then((response) => {
        console.log("Check data: ", response);
        setAllRole(response);
      })
      .catch((error) => {
        console.log("Check error: ", error);
      });
  };
  useEffect(() => {
    fetchAllRole();
  }, []);
  return (
    <ContentContainer>
      <RoleHeader fetchAllRole={fetchAllRole} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      ></div>

      <RoleTable role={role} fetchAllRole={fetchAllRole} />
    </ContentContainer>
  );
}
