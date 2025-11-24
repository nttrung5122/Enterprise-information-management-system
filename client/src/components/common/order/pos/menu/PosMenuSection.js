import React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const PosMenuSection = ({
  section,
  handleSelectedSection,
  selectedSection,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        position: "sticky",
        top: 20,
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          p: 1,
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          color="text.secondary"
        >
          Danh mục
        </Typography>
      </Box>
      <MenuList sx={{ p: 0 }}>
        {section.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              handleSelectedSection(item.id, item.food);
            }}
            selected={selectedSection === item.id}
            sx={{
              py: 1.5,
              px: 2,
              "&.Mui-selected": {
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#bbdefb",
                },
              },
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <Typography variant="body2">{item.nameSection}</Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
};

export default PosMenuSection;
