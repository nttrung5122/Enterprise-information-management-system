import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AddSectionModal } from "./modal/AddSectionModal";

export default function MenuSectionHeader({ getAllMenuSection }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Phân loại thực đơn
          </Typography>
          <AddSectionModal getAllMenuSection={getAllMenuSection} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
