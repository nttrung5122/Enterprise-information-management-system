import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AddRoleModal } from "../Modal/AddRoleModal";

export default function RoleHeader({ fetchAllRole }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Danh sách chức vụ:
          </Typography>
          <AddRoleModal fetchAllRole={fetchAllRole} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
