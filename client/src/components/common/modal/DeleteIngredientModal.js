import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteIngredient } from "../../../services/UserService";
import { toast } from "react-toastify";

const DeleteIngredientModal = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteIngredient(id)
      .then(() => {
        console.log("Delete successfully");
        setOpen(false);
        toast.success("Xóa nguyên liệu thành công.");
      })
      .catch((error) => {
        console.log("Error deleting ingredient: ", error);
        console.log("Check the ingredient: ", id);
        toast.error("Xóa nguyên liệu thất bại.");
        setOpen(false);
      });
  };

  return (
    <React.Fragment>
      <Button color="error" onClick={handleClickOpen}>
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="error">
          {"Xóa nguyên liệu"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="">
            Bạn có chắc muốn xóa nguyên liệu này?
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
};
export default DeleteIngredientModal;
