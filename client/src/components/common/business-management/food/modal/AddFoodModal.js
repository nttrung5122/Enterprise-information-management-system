import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";

import { addFood } from "../../../../../services/BusinessService";
import SuccessModal from "../../../modal/SuccessModal";
import RecipeSelectModal from "./RecipeSelectModal";

export const AddFoodModal = ({ getAllFood }) => {
  const [open, setOpen] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control the success modal
  const [selectedRecipeId, setSelectedRecipeId] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const foodData = {
      name: formData.get("nameFood"),
      info: formData.get("info"),
      price: formData.get("price"),
      recipeId: selectedRecipeId,
    };

    addFood(foodData)
      .then(() => {
        setShowSuccessModal(true);
        setTimeout(() => {
          getAllFood();
        }, 3000);
      })
      .catch((error) => {
        console.log("Check the error adding food: ", error);
        console.log("Check the error food: ", foodData);
      });
    setOpen(false);
  };

  const handleRecipeChange = (recipeId) => {
    setSelectedRecipeId(recipeId); // Update the selected recipe ID
  };

  const theme = createTheme();

  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Thêm món ăn
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Thêm món ăn</DialogTitle>
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
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="info"
            name="info"
            label="Chi tiết"
            fullWidth
            variant="standard"
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
          />

          <RecipeSelectModal handleRecipeChange={handleRecipeChange} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Thêm món ăn</Button>
        </DialogActions>
      </Dialog>
      {showSuccessModal && <SuccessModal message="Tạo thành công." />}
    </React.Fragment>
  );
};
