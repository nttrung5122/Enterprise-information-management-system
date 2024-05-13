import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SalaryHeader from "./SalaryHeader";
import { SalaryTable } from "./SalaryTable";

import {
  fetchAllUsers,
  getUserSalaryInMonth,
} from "../../../services/UserService";

export const SalaryContent = () => {
  const [users, setUsers] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [year, setYear] = useState(2023);

  const getAllUsers = () => {
    fetchAllUsers()
      .then((response) => {
        setUsers(response); // Check if response is an array of users
      })
      .catch((error) => {
        console.log("Error when getting users data: ", error);
      });
  };

  const fetchUserSalaryInMonth = () => {
    // Ensure users state is updated before fetching salaries
    if (users.length > 0) {
      users.forEach((user) => {
        getUserSalaryInMonth(user.id, year)
          .then((response) => {
            console.log("res: ", [response]);
            setSalaries((prevSalaries) => [response, ...prevSalaries]);
            // setSalaries([...response]);
            /*{   console.log("check salaries", salaries);} */
          })
          .catch((error) => {
            console.log("Error when getting user salary", error);
          });
      });
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  // Call fetchUserSalaryInMonth whenever users or year changes
  useEffect(() => {
    fetchUserSalaryInMonth();
  }, [users, year]);

  const SalaryContainer = styled("div")({
    flexGrow: 1,
    padding: "10px",
    marginLeft: "-60px",
  });

  const FilterGroupContainer = styled("div")({
    display: "flex",
    alignItems: "center",
  });

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  return (
    <SalaryContainer>
      <SalaryHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FilterGroupContainer>
          <Box sx={{ minWidth: 120, mt: 2 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Năm</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                label="Age"
                onChange={handleChangeYear}
              >
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </FilterGroupContainer>
      </div>

      <SalaryTable
        users={users}
        year={year}
        salaries={salaries}
        fetchUserSalaryInMonth={fetchUserSalaryInMonth}
      />
    </SalaryContainer>
  );
};
