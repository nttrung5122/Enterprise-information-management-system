import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";
import { updateInventory } from "../../../services/UserService";

export const UpdateInventoryModal = ({ ingredient, fetchInventoryData }) => {
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
    const inventoryData = {
      quantity: formData.get("quantity"),
    };

    updateInventory(ingredient.id, inventoryData)
      .then(() => {
        console.log("Update ingredient successfully ");
        fetchInventoryData();
        handleClose();
      })
      .catch((error) => {
        console.log("Check updated error: ", error);
      });

    setOpen(false);
  };
  const theme = createTheme();

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>Cập nhật</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Cập nhật số lượng nguyên liệu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="quantity"
            name="quantity"
            label="Cập nhật số lượng"
            fullWidth
            variant="standard"
            defaultValue={ingredient.quantity}
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
