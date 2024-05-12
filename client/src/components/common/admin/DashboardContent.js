import React, { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardTable from "./DashboardTable";
import { styled } from "@mui/system";
import SearchInput from "./SearchInput";
import FilterButtonGroup from "./FilterButtonGroup";
import { fetchAllUsers } from "../../../services/UserService";

export default function DashboardContent() {
  const ContentContainer = styled("div")({
    flexGrow: 1,
    padding: "10px", // Add padding for better spacing
    marginLeft: "-60px", // Adjust the margin to offset the sidebar width
  });

  const FilterGroupContainer = styled("div")({
    display: "flex",
    alignItems: "center",
  });

  const [users, setUsers] = useState([]);

  const fetchUsersData = () => {
    fetchAllUsers()
      .then((response) => {
        console.log("Fetched users:", response);
        setUsers(response); // Update the users state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchUsersData();
  }, []);
  return (
    <ContentContainer>
      <DashboardHeader fetchUsersData={fetchUsersData} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      ></div>
      <DashboardTable users={users} fetchUsersData={fetchUsersData} />
    </ContentContainer>
  );
}
