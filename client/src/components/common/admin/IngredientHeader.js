import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AddIngredientModal } from "../Modal/AddIngredientModal";

export default function IngredientHeader({ fetchIngredientsData }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Danh sách nguyên liệu:
          </Typography>
          <AddIngredientModal fetchIngredientsData={fetchIngredientsData} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
