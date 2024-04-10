import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";
import { addSupplier } from "../../../services/UserService";

export const AddSupplierModal = ({ fetchSuppliersData }) => {
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
    const supplierInfo = {
      name: formData.get("name"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
    };

    addSupplier(supplierInfo)
      .then(() => {
        console.log("Supplier added successfully.");
        fetchSuppliersData();
      })
      .catch((error) => {
        console.log("Check the error adding supplier: ", error);
        console.log("Check the supplier: ", supplierInfo);
      });
    setOpen(false);
  };
  const theme = createTheme();

  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Thêm nhà cung cấp
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Thêm nhà cung cấp</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Tên nhà cung cấp"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phoneNumber"
            name="phoneNumber"
            label="Số điện thoại"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Thêm nhà cung cấp</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
