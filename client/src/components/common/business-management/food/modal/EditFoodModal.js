import React, { useState, useEffect } from "react";
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
import { toast } from "react-toastify";

export const EditFoodModal = ({ food, getAllFood }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  // Initialize selectedRecipeId with food's current recipeId when modal opens
  useEffect(() => {
    if (open && food) {
      setSelectedRecipeId(food.recipeId || null);
    }
  }, [open, food]);

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
    };

    // Only include recipeId if it's a valid value (not empty string)
    if (selectedRecipeId && selectedRecipeId !== "") {
      foodData.recipeId = parseInt(selectedRecipeId);
    } else if (selectedRecipeId === "") {
      // If explicitly set to empty string, set to null
      foodData.recipeId = null;
    }
    // If selectedRecipeId is null/undefined, don't include it (keep existing value)

    updateFood(food.id, foodData)
      .then(() => {
        toast.success("Cập nhật món ăn thành công.");
        handleClose();
        getAllFood();
      })
      .catch((error) => {
        console.log("Check updated error: ", error);
        const errorMessage =
          typeof error === "string"
            ? error
            : error.message || "Có lỗi xảy ra khi cập nhật món ăn.";
        toast.error(errorMessage);
      });
  };

  const theme = createTheme();

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        <ModeEditIcon />
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
            required
            margin="dense"
            id="price"
            name="price"
            label="Gía"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={food.price}
          />
          <TextField
            required
            margin="dense"
            id="info"
            name="info"
            label="Thông tin"
            fullWidth
            variant="standard"
            defaultValue={food.info}
          />
          <RecipeSelectModal
            handleRecipeChange={handleRecipeChange}
            defaultValue={food.recipeId}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
