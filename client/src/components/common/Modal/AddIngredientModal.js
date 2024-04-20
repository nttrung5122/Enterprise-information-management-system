import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";
import { addIngredient } from "../../../services/UserService";
import SuccessModal from "./SuccessModal";

export const AddIngredientModal = ({ fetchIngredientsData }) => {
  const [open, setOpen] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false); // State to control the success modal
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

    addIngredient(ingredientData)
      .then(() => {
        setShowSuccessModal(true);
        setTimeout(() => {
          fetchIngredientsData();
        }, 3000);
      })
      .catch((error) => {
        console.log("Check the error adding ingredient: ", error);
        console.log("Check the ingredient: ", ingredientData);
      });
    setOpen(false);
  };
  const theme = createTheme();

  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Thêm nguyên liệu
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Thêm nguyên liệu</DialogTitle>
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
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Thêm nguyên liệu</Button>
        </DialogActions>
      </Dialog>
      {showSuccessModal && <SuccessModal message="Tạo thành công." />}
    </React.Fragment>
  );
};
