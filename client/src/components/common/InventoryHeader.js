import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AddIngredientModal } from "./Modal/AddIngredientModal";

export default function InventoryHeader({ fetchIngredientsData }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Quản lý kho
          </Typography>
          <AddIngredientModal fetchIngredientsData={fetchIngredientsData} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
