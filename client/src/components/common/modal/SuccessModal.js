import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SuccessModal({ message }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{ color: "success.main" }}
    >
      <DialogTitle sx={{ display: "flex", margin: "0 auto" }}>
        <h3> Thao tác thành công </h3>
        <IconButton aria-label="success" color="success">
          <CheckCircleIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", margin: "0 auto" }}>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
