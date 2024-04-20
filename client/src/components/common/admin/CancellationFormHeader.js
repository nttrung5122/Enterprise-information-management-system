import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AddCancellationModal } from "../modal/AddCancellationModal";

export default function CancellationFormHeader({ fetchCancellationForms }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Danh sách mẫu hủy:
          </Typography>
          <AddCancellationModal
            fetchCancellationForms={fetchCancellationForms}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
