import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AddReceiptModal } from "../Modal/AddReceiptModal";
export default function ReceiptHeader({ fetchReceiptsData }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hóa đơn
          </Typography>
          <AddReceiptModal fetchReceiptsData={fetchReceiptsData} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
