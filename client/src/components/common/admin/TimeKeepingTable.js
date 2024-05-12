import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CheckInTable from "./checkIn/CheckInTable";
import { fetchAllUsers } from "../../../services/UserService";
import { CheckInCalendar } from "./checkIn/CheckInCalendar";

const StyledCalendar = styled(Calendar)({
  width: "100%", // Adjust the width as needed
  height: "auto", // Adjust the height as needed
});

export default function TimeKeepingTable() {
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetchAllUsers()
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.log("Error when fetching users data:", error);
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const months = [
    { value: 0, label: "1" },
    { value: 1, label: "2" },
    { value: 2, label: "3" },
    { value: 3, label: "4" },
    { value: 4, label: "5" },
    { value: 5, label: "6" },
    { value: 6, label: "7" },
    { value: 7, label: "8" },
    { value: 8, label: "9" },
    { value: 9, label: "10" },
    { value: 10, label: "11" },
    { value: 11, label: "12" },
  ];

  const years = [2023, 2024];

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Chấm công nhân viên" />
          <Tab label="Kiểm tra chấm công" />
        </Tabs>
      </Box>
      {/* Content corresponding to each tab */}
      <Box p={3}>
        {value === 0 && <CheckInTable users={users} />}
        {value === 1 && <CheckInCalendar users={users} />}
      </Box>
    </Box>
  );
}
