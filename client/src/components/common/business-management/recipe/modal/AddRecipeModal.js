import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";
import IngredientSelectModal from "./IngredientSelectModal";
import { Typography, Box } from "@mui/material";
import { createRecipe } from "../../../../../services/BusinessService";
import { toast } from "react-toastify";

export const AddRecipeModal = ({ fetchRecipeData }) => {
  const [open, setOpen] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([
    { ingredientId: "", quantity: "" },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form when closing
    setIngredients([{ ingredientId: "", quantity: "" }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const recipeName = formData.get("name");

    // Validate recipe name
    if (!recipeName || recipeName.trim() === "") {
      toast.error("Vui lòng nhập tên công thức.");
      return;
    }

    // Validate ingredients
    const validIngredients = ingredients.filter(
      (ing) => ing.ingredientId && ing.quantity && ing.quantity.trim() !== ""
    );

    if (validIngredients.length === 0) {
      toast.error("Vui lòng thêm ít nhất một nguyên liệu.");
      return;
    }

    // Check if any ingredient is missing required fields
    const hasInvalidIngredient = ingredients.some(
      (ing) =>
        (ing.ingredientId && !ing.quantity) ||
        (!ing.ingredientId && ing.quantity)
    );

    if (hasInvalidIngredient) {
      toast.error("Vui lòng điền đầy đủ thông tin cho tất cả nguyên liệu.");
      return;
    }

    const recipeData = {
      name: recipeName,
      details: validIngredients.map((ing) => ({
        ingredientId: parseInt(ing.ingredientId),
        quantity: parseFloat(ing.quantity),
      })),
    };

    createRecipe(recipeData)
      .then(() => {
        toast.success("Tạo công thức thành công.");
        handleClose();
        fetchRecipeData();
      })
      .catch((error) => {
        console.error("Error adding recipe:", error);
        const errorMessage =
          typeof error === "string"
            ? error
            : error.message || "Có lỗi xảy ra khi tạo công thức.";
        toast.error(errorMessage);
      });
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
    setIngredients([...ingredients, { ingredientId: "", quantity: "" }]);
  };

  const handleDeleteIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    } else {
      toast.error("Công thức phải có ít nhất một nguyên liệu.");
    }
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
        maxWidth="sm"
        fullWidth
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
            <Box key={index} sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Nguyên liệu {index + 1}
              </Typography>
              <IngredientSelectModal
                handleIngredientChange={(ingredientId) =>
                  handleIngredientChange(index, "ingredientId", ingredientId)
                }
                defaultValue={ingredient.ingredientId}
              />

              <TextField
                required
                margin="dense"
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                label="Số lượng"
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                fullWidth
                variant="standard"
                value={ingredient.quantity}
                onChange={(event) => handleQuantityChange(index, event)}
              />

              <Button
                onClick={() => handleDeleteIngredient(index)}
                color="error"
                size="small"
                sx={{ mt: 1 }}
              >
                Xóa nguyên liệu
              </Button>
            </Box>
          ))}
          {/* Button to add a new ingredient */}
          <Button
            onClick={handleAddIngredient}
            variant="outlined"
            sx={{ mt: 2 }}
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
