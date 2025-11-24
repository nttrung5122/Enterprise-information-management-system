import React, { useState, useEffect, useMemo } from "react";
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
  // Initialize with current year
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const getAllUsers = () => {
    fetchAllUsers()
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.log("Error when getting users data: ", error);
      });
  };

  const fetchUserSalaryInMonth = () => {
    if (users.length > 0) {
      setSalaries([]); // Reset salaries before fetching
      const salaryPromises = users.map((user) =>
        getUserSalaryInMonth(user.id, year)
          .then((response) => response)
          .catch((error) => {
            console.log("Error when getting user salary", error);
            return null;
          })
      );

      Promise.all(salaryPromises).then((responses) => {
        setSalaries(responses.filter((r) => r !== null));
      });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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

  // Generate years dynamically (10 years back, 5 years forward from current year)
  const years = useMemo(() => {
    const startYear = currentYear - 10;
    const endYear = currentYear + 5;
    return Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );
  }, [currentYear]);

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
              <InputLabel id="year-select-label">Năm</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={year}
                label="Năm"
                onChange={handleChangeYear}
              >
                {years.map((yearOption) => (
                  <MenuItem key={yearOption} value={yearOption}>
                    {yearOption}
                  </MenuItem>
                ))}
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
