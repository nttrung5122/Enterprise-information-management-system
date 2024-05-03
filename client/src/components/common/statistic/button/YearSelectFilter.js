import React from "react";
import { ButtonGroup, Button } from "@mui/material";

const YearSelectFilter = ({ onYearChange }) => {
  const years = [2024, 2023, 2022]; // List of available years

  return (
    <ButtonGroup variant="outlined" aria-label="select year">
      {years.map((year) => (
        <Button key={year} onClick={() => onYearChange(year)}>
          {year}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default YearSelectFilter;
