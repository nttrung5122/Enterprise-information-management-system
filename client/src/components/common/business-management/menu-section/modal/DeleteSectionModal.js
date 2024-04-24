import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteMenuSection } from "../../../../../services/BusinessService";
import SuccessModal from "../../../modal/SuccessModal";

const DeleteSectionModal = ({ id, getAllMenuSection }) => {
  const [open, setOpen] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteMenuSection(id)
      .then(() => {
        console.log("Delete successfully");
        setOpen(false);
        setShowSuccessModal(true);
        setTimeout(() => {
          getAllMenuSection();
        }, 3000);
      })
      .catch((error) => {
        console.log("Error deleting ingredient: ", error);
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
            Bạn có chắc muốn xóa mục này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Không</Button>
          <Button onClick={handleDelete} autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
      {showSuccessModal && <SuccessModal message="Tạo thành công." />}
    </React.Fragment>
  );
};
export default DeleteSectionModal;
