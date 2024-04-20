import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AddSupplierModal } from "../modal/AddSupplierModal";

export default function SupplierHeader({ fetchSuppliersData }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nhà cung cấp:
          </Typography>
          <AddSupplierModal fetchSuppliersData={fetchSuppliersData} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
