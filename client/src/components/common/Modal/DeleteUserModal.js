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
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    console.log("check user id:", userId, "on date:", formattedDate);
    deleteUser(userId, formattedDate)
      .then(() => {
        console.log("Delete successfully");
        setOpen(false);
      })
      .catch((error) => {
        console.log("Error deleting user: ", error);
        setOpen(false);
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
