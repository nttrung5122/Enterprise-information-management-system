import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { createTheme } from "@mui/material/styles";
import { updateRecipe } from "../../../../../services/BusinessService";

export const EditRecipeModal = ({ recipe, fetchRecipeData }) => {
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = React.useState(recipe.details || []);

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
      details: details, // Include details in the recipe data
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

  const handleDetailChange = (index, fieldName, value) => {
    const newDetails = [...details];
    newDetails[index][fieldName] = value;
    setDetails(newDetails);
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
        <DialogTitle>Sửa thông tin nguyên liệu</DialogTitle>
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
          {details.map((detail, index) => (
            <div key={index}>
              <TextField
                margin="dense"
                id={`ingredient-${index}`}
                name={`ingredient-${index}`}
                label={`Nguyên liệu ${index + 1}`}
                fullWidth
                variant="standard"
                defaultValue={detail.ingredientId}
                onChange={(event) =>
                  handleDetailChange(index, "ingredientId", event.target.value)
                }
              />
              <TextField
                margin="dense"
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                label="Số lượng"
                fullWidth
                variant="standard"
                defaultValue={detail.quantity}
                onChange={(event) =>
                  handleDetailChange(index, "quantity", event.target.value)
                }
              />
            </div>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
