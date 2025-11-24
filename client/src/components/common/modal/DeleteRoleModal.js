import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteRole } from "../../../services/UserService";
import { toast } from "react-toastify";

const DeleteRoleModal = ({ id, fetchAllRole }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteRole(id)
      .then(() => {
        toast.success("Xóa chức vụ thành công.");
        handleClose();
        fetchAllRole();
      })
      .catch((error) => {
        console.log("Error deleting role: ", error);
        toast.error("Xóa chức vụ thất bại.");
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
            Bạn có chắc muốn xóa chức vụ này?
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
export default DeleteRoleModal;
