import React, { useState, useEffect } from "react";
import DashboardHeader from "../common/DashboardHeader";
import DashboardTable from "../common/DashboardTable";
import { styled } from "@mui/system";
import SearchInput from "../common/SearchInput";
import FilterButtonGroup from "../common/FilterButtonGroup";
import { fetchAllUsers } from "../../services/UserService";
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
  useEffect(() => {
    fetchUsersData();
  }, []);
  const fetchUsersData = () => {
    fetchAllUsers()
      .then((response) => {
        console.log("Fetched users:", response.data);
        setUsers(response.data); // Update the users state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <ContentContainer>
      <DashboardHeader fetchUsersData={fetchUsersData} />
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
      <DashboardTable users={users} />
    </ContentContainer>
  );
}
