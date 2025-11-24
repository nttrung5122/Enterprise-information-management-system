import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import { createTheme } from "@mui/material/styles";
import { updateRecipe } from "../../../../../services/BusinessService";
import IngredientSelectModal from "./IngredientSelectModal";
import { toast } from "react-toastify";
import { Typography, Box } from "@mui/material";

export const EditRecipeModal = ({ recipe, fetchRecipeData }) => {
  const [open, setOpen] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([]);

  // Initialize ingredients state when modal opens or recipe changes
  React.useEffect(() => {
    if (recipe && recipe.ingredients) {
      const formattedIngredients = recipe.ingredients.map((ing) => ({
        ingredientId: ing.id || ing.ingredientId || "",
        quantity: ing.recipe_detail?.quantity || ing.quantity || "",
      }));
      setIngredients(
        formattedIngredients.length > 0
          ? formattedIngredients
          : [{ ingredientId: "", quantity: "" }]
      );
    }
  }, [recipe, open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

    // Validate and format ingredients
    const validIngredients = ingredients.filter(
      (ing) =>
        ing.ingredientId &&
        ing.quantity &&
        ing.quantity.toString().trim() !== ""
    );

    if (validIngredients.length === 0) {
      toast.error("Vui lòng thêm ít nhất một nguyên liệu.");
      return;
    }

    // Transform to the format expected by backend
    const details = validIngredients.map((ing) => ({
      ingredientId: parseInt(ing.ingredientId),
      quantity: parseFloat(ing.quantity),
    }));

    const recipeData = {
      name: recipeName,
      details: details, // Backend expects 'details', not 'ingredients'
    };

    updateRecipe(recipe.id, recipeData)
      .then(() => {
        toast.success("Cập nhật công thức thành công.");
        handleClose();
        fetchRecipeData();
      })
      .catch((error) => {
        console.log("Check updated error: ", error);
        const errorMessage =
          typeof error === "string"
            ? error
            : error.message || "Có lỗi xảy ra khi cập nhật công thức.";
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

  const handleDeleteIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    } else {
      toast.error("Công thức phải có ít nhất một nguyên liệu.");
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredientId: "", quantity: "" }]);
  };

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
        maxWidth="sm"
        fullWidth
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
            defaultValue={recipe.nameRecipe || recipe.name}
          />
          {ingredients.map((ingredient, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography sx={{ mb: 1 }}>Nguyên liệu {index + 1}</Typography>
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
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleAddIngredient} variant="outlined">
              <AddIcon /> Thêm nguyên liệu
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
