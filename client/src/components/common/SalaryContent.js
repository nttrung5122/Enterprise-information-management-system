import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import SearchInput from "../common/SearchInput";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SalaryHeader from "./SalaryHeader";
import { SalaryTable } from "./SalaryTable";
import {
  getUserSalaryInMonth,
  fetchAllUsers,
} from "../../services/UserService";

export const SalaryContent = () => {
  const [users, setUsers] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [year, setYear] = useState(2024);

  useEffect(() => {
    const fetchData = async () => {
      fetchAllUsers()
        .then((userData) => {
          console.log("User Data:", userData); // Log userData to inspect its structure
          setUsers(userData.data);
          // Fetch salaries for each user
          Promise.all(
            userData.data.map((user) => {
              return getUserSalaryInMonth(user.id, year);
            })
          )
            .then((salaryData) => {
              setSalaries(salaryData);
            })
            .catch((error) => {
              console.error("Error fetching salaries data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching users data:", error);
        });
    };

    fetchData();
  }, [year]);

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
        <SearchInput />
        <FilterGroupContainer>
          <Box sx={{ minWidth: 120, ml: 2 }}>
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
      <SalaryTable users={users} year={year} salaries={salaries} />
    </SalaryContainer>
  );
};
