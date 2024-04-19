import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AddEmployeeModal } from "../Modal/AddEmployeeModal";
export default function ButtonAppBar({ fetchUsersData }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nhân viên:
          </Typography>
          <Button color="inherit">
            <AddEmployeeModal fetchUsersData={fetchUsersData} />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
