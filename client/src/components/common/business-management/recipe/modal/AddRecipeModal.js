import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";
import IngredientSelectModal from "./IngredientSelectModal";
import { Typography } from "@mui/material";
import { createRecipe } from "../../../../../services/BusinessService";

export const AddRecipeModal = ({ fetchRecipeData }) => {
  const [open, setOpen] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([
    { ingredientId: "", quantity: "", pricePerUnit: "" },
  ]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const recipeData = {
      name: formData.get("name"),
      details: ingredients,
    };

    createRecipe(recipeData)
      .then(() => {
        console.log("Recipe added successfully.");
        fetchRecipeData();
      })
      .catch((error) => {
        console.log("Check the error adding recipe: ", error);
        console.log(recipeData);
      });
    setOpen(false);
  };

  const handleIngredientChange = (index, fieldName, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][fieldName] = value;
    setIngredients(newIngredients);
  };

  const handleQuantityChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = event.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { ingredientId: "", quantity: "", pricePerUnit: "" },
    ]);
  };
  const handleDeleteIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  const theme = createTheme();

  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Tạo công thức
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Tạo công thức mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Tên công thức"
            fullWidth
            variant="standard"
          />

          {ingredients.map((ingredient, index) => (
            <div key={index} mt={1}>
              <Typography mt={2}>Nguyên liệu {index + 1}</Typography>
              <IngredientSelectModal
                handleIngredientChange={(ingredientId) =>
                  handleIngredientChange(index, "ingredientId", ingredientId)
                }
              />

              <TextField
                autoFocus
                required
                margin="dense"
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                label="Số lượng"
                fullWidth
                variant="standard"
                value={ingredient.quantity}
                onChange={(event) => handleQuantityChange(index, event)}
              />

              <Button onClick={() => handleDeleteIngredient(index)}>
                Xóa nguyên liệu
              </Button>
            </div>
          ))}
          {/* Button to add a new ingredient */}
          <Button
            onClick={handleAddIngredient}
            variant="outlined"
            sx={{ mt: 1, float: "right" }} // Adjust the position to the right of the dialog content
          >
            Thêm nguyên liệu
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
