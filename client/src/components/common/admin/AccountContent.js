import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { fetchAllUsers, addNewUser } from "../../../services/UserService";
import AccountsTable from "./AccountsTable";
import AccountHeader from "./AccountHeader";
import SearchInput from "./SearchInput";
import FilterButtonGroup from "./FilterButtonGroup";

export default function AccountContent() {
  const ContentContainer = styled("div")({
    flexGrow: 1,
    padding: "10px", // Add padding for better spacing
    marginLeft: "-60px", // Adjust the margin to offset the sidebar width
  });

  const FilterGroupContainer = styled("div")({
    display: "flex",
    alignItems: "center",
  });

  const [users, setUsers] = useState([]); // State to store users data
  const fetchUsersData = () => {
    fetchAllUsers()
      .then((response) => {
        console.log("Check data >>>>:", response);
        setUsers(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }; // Empty dependency array means this effect runs once after the first render

  useEffect(() => {
    fetchUsersData();
  }, []);

  const handleAddEmployee = (userData) => {
    addNewUser(userData)
      .then(() => {
        console.log("Employee added successfully!");
        fetchUsersData(); // Fetch users data again after adding a new employee
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  };
  return (
    <ContentContainer>
      <AccountHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      ></div>

      <AccountsTable users={users} />
    </ContentContainer>
  );
}
