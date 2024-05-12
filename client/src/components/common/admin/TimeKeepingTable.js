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
import { UpdateCheckIn } from "./checkIn/UpdateCheckIn";

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
