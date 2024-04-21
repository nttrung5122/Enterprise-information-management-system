import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { createTheme } from "@mui/material/styles";
import { updateSupplier } from "../../../services/UserService";

export const EditSupplierModal = ({ supplier, fetchSuppliersData }) => {
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
    const supplierData = {
      name: formData.get("name"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
    };

    updateSupplier(supplier.id, supplierData)
      .then(() => {
        console.log("Update supplier successfully ");
        handleClose();
        fetchSuppliersData();
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
        <DialogTitle>Sửa thông tin nhà cung cấp</DialogTitle>
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
            defaultValue={supplier.name}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phoneNumber"
            name="phoneNumber"
            label="Đơn vị"
            fullWidth
            variant="standard"
            defaultValue={supplier.phoneNumber}
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
            defaultValue={supplier.email}
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
