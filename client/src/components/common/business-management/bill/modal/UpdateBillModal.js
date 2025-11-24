import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { setBillDone } from "../../../../../services/BusinessService";
import { toast } from "react-toastify";

const UpdateBillModal = ({ id, fetchAllBill }) => {
  const [open, setOpen] = React.useState(false);

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
        toast.success("Cập nhật trạng thái hóa đơn thành công.");
        fetchAllBill();
      })
      .catch((error) => {
        console.log("Error deleting ingredient: ", error);
        toast.error("Cập nhật trạng thái hóa đơn thất bại.");
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
    </React.Fragment>
  );
};
export default UpdateBillModal;
