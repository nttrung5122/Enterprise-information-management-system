import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";
import { addCancellationForm } from "../../../services/UserService";
import { Typography } from "@mui/material";

export const AddCancellationModal = ({
  fetchCancellationForms,
  employeeId,
}) => {
  const [open, setOpen] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([
    { ingredientId: "", quantity: "" },
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
    const cancelFormData = {
      employeeId: formData.get("employeeId"),
      note: formData.get("note"),
      details: ingredients,
    };

    addCancellationForm(cancelFormData)
      .then(() => {
        fetchCancellationForms();
        console.log("Cancellation Form added successfully.");
      })
      .catch((error) => {
        console.log("Check the error adding form: ", error);
        console.log(cancelFormData);
      });
    setOpen(false);
  };

  const handleIngredientIdChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index].ingredientId = event.target.value;
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
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  const theme = createTheme();

  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Tạo hóa đơn
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Tạo hóa đơn mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="employeeId"
            name="employeeId"
            label="Mã nhân viên"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="note"
            name="note"
            label="Nguyên nhân"
            fullWidth
            variant="standard"
          />
          {ingredients.map((ingredient, index) => (
            <div key={index} mt={1}>
              <Typography mt={2}>Nguyên liệu {index + 1}</Typography>
              <TextField
                autoFocus
                required
                margin="dense"
                id={`ingredientId-${index}`}
                name={`ingredientId-${index}`}
                label="Mã nguyên liệu"
                fullWidth
                variant="standard"
                value={ingredient.ingredientId}
                onChange={(event) => handleIngredientIdChange(index, event)}
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
          <Button type="submit">Thêm hóa đơn</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
