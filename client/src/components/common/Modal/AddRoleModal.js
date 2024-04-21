import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";
import { addRole } from "../../../services/UserService";
import SuccessModal from "./SuccessModal";

export const AddRoleModal = ({ role, fetchAllRole }) => {
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
    const roleData = {
      id: role.id,
      info: formData.get("info"),
      baseSalary: formData.get("baseSalary"),
    };

    addRole(roleData)
      .then(() => {
        setShowSuccessModal(true);
        setTimeout(() => {
          fetchAllRole();
        }, 2000);
      })
      .catch((error) => {
        console.log("Check the error adding role: ", error);
        console.log("Check the role: ", roleData);
      });
    setOpen(false);
  };
  const theme = createTheme();

  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Thêm chức vụ:
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Thêm chức vụ</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="info"
            name="info"
            label="Tên chức vụ"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="baseSalary"
            name="baseSalary"
            label="Lương cơ bản"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Thêm chức vụ</Button>
        </DialogActions>
      </Dialog>
      {showSuccessModal && <SuccessModal message="Thêm thành công." />}
    </React.Fragment>
  );
};
