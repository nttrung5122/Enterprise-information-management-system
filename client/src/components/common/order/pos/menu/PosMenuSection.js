import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";

const PosMenuSection = ({ section, handleSelectedSection }) => {
  return (
    <Paper sx={{ width: 230 }}>
      <MenuList>
        {section.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              handleSelectedSection(item.id, item.food);
              console.log("Check food in section", item.food);
            }}
          >
            {item.nameSection}
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
};

export default PosMenuSection;
