import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { deleteUser } from "../../../services/UserService";

export default function AlertDialog({ userId }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const employeeData = {
      employeeId: userId,
      date: new Date().toISOString().slice(0, 10), // Get current date in YYYY-MM-DD format
    };
    deleteUser(employeeData)
      .then(() => {
        console.log("User deleted successfully!");
        handleClose(); // Close the dialog after successful deletion
        // You may also trigger a data fetch to update the UI accordingly
      })
      .catch((error) => {
        console.error("Error deleting user:", error, employeeData);
        // Handle error gracefully, e.g., display an error message
      });
  };

  return (
    <React.Fragment>
      <Button color="error" onClick={handleClickOpen}>
        <PersonRemoveIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="error">
          {"Xóa thành viên"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="">
            Bạn có chắc muốn xóa thành viên này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Không</Button>
          <Button onClick={handleDelete} autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
