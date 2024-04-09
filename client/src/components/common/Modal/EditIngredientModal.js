import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { createTheme } from "@mui/material/styles";
import { updateIngredient } from "../../../services/UserService";

export const EditIngredientModal = ({ ingredient, fetchIngredientsData }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const ingredientData = {
      nameIngredient: formData.get("nameIngredient"),
      unitCal: formData.get("unitCal"),
    };

    updateIngredient(ingredient.id, ingredientData)
      .then((response) => {
        console.log("Ingredient updated successfully.");
        handleClose(); // Call handleClose as a function
        fetchIngredientsData();
      })
      .catch((error) => {
        console.log("Check updated error: ", error);
      });

    setOpen(false);
  };
  const theme = createTheme();

  return (
    <React.Fragment>
      <Button>
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
        <DialogTitle>Sửa thông tin nguyên liệu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="nameIngredient"
            name="nameIngredient"
            label="Tên nguyên liệu"
            fullWidth
            variant="standard"
            defaultValue={ingredient.name}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="unitCal"
            name="unitCal"
            label="Đơn vị"
            fullWidth
            variant="standard"
            defaultValue={ingredient.unit}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Thêm nguyên liệu</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
