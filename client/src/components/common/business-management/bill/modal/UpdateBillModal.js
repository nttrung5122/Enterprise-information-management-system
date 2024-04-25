import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SuccessModal from "../../../modal/SuccessModal";
import { setBillDone } from "../../../../../services/BusinessService";

const UpdateBillModal = ({ id, fetchAllBill }) => {
  const [open, setOpen] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateStatus = () => {
    setBillDone(id)
      .then(() => {
        console.log("update status successfully");
        setOpen(false);
        setShowSuccessModal(true);
        setTimeout(() => {
          fetchAllBill();
        }, 3000);
      })
      .catch((error) => {
        console.log("Error deleting ingredient: ", error);
        setOpen(false);
      });
  };

  return (
    <React.Fragment>
      <Button color="success" onClick={handleClickOpen}>
        <CheckCircleOutlineIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="success-dialog-title" color="green">
          {"Cập nhật hóa đơn"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="">
            Cập nhật trạng thái hóa đơn?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Không</Button>
          <Button onClick={handleUpdateStatus} autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
      {showSuccessModal && <SuccessModal message="Thao tác thành công." />}
    </React.Fragment>
  );
};
export default UpdateBillModal;
