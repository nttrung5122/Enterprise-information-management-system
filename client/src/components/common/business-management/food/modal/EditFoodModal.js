import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { createTheme } from "@mui/material/styles";
import { updateFood } from "../../../../../services/BusinessService";
import RecipeSelectModal from "./RecipeSelectModal";

export const EditFoodModal = ({ food, getAllFood }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRecipeChange = (recipeId) => {
    setSelectedRecipeId(recipeId); // Update the selected recipe ID
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const foodData = {
      nameFood: formData.get("nameFood"),
      price: formData.get("price"),
      info: formData.get("info"),
      recipeId: selectedRecipeId,
    };

    updateFood(food.id, foodData)
      .then(() => {
        console.log("update successfully");
        handleClose(); // Call handleClose as a function
        getAllFood();
      })
      .catch((error) => {
        console.log("Check updated error: ", error);
      });
  };

  const theme = createTheme();

  return (
    <React.Fragment>
      <Button variant="contained" color="primary">
        <ModeEditIcon onClick={handleClickOpen} />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Sửa thông tin món ăn</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="nameFood"
            name="nameFood"
            label="Tên món ăn"
            fullWidth
            variant="standard"
            defaultValue={food.nameFood}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Gía"
            fullWidth
            variant="standard"
            defaultValue={food.price}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="info"
            name="info"
            label="Thông tin"
            fullWidth
            variant="standard"
            defaultValue={food.info}
          />
          <RecipeSelectModal handleRecipeChange={handleRecipeChange} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
