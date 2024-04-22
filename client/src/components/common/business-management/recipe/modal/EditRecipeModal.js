import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { createTheme } from "@mui/material/styles";
import { updateRecipe } from "../../../../../services/BusinessService";
import IngredientSelectModal from "./IngredientSelectModal"; // Import the IngredientSelectModal component

export const EditRecipeModal = ({ recipe, fetchRecipeData }) => {
  const [open, setOpen] = React.useState(false);
  const [ingredients, setIngredients] = React.useState(
    recipe.ingredients || []
  );

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
      ingredients: ingredients, // Include ingredients in the recipe data
    };

    updateRecipe(recipe.id, recipeData)
      .then(() => {
        console.log("update successfully");
        handleClose();
        fetchRecipeData();
      })
      .catch((error) => {
        console.log("Check updated error: ", error);
      });
  };

  const handleIngredientChange = (index, fieldName, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][fieldName] = value;
    setIngredients(newIngredients);
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleAddIngredient = (ingredientId) => {
    setIngredients([
      ...ingredients,
      { ingredientId, recipe_detail: { quantity: "" } },
    ]);
  };

  const theme = createTheme();

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
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
        <DialogTitle>Sửa thông tin công thức</DialogTitle>
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
            defaultValue={recipe.name}
          />
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <IngredientSelectModal
                handleIngredientChange={(ingredientId) =>
                  handleIngredientChange(index, "ingredientId", ingredientId)
                }
              />
              <TextField
                margin="dense"
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                label="Số lượng"
                fullWidth
                variant="standard"
                defaultValue={ingredient.recipe_detail.quantity}
                onChange={(event) =>
                  handleIngredientChange(index, "quantity", event.target.value)
                }
              />
              <Button onClick={() => handleDeleteIngredient(index)}>
                Xóa nguyên liệu
              </Button>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleAddIngredient}>
              <AddIcon /> Thêm nguyên liệu
            </Button>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
