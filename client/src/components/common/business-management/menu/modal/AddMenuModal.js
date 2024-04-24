import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";

import SuccessModal from "./../../../modal/SuccessModal";
import { addMenu } from "../../../../../services/BusinessService";
import SelectSectionModal from "./SelectSectionModal";

export const AddMenuModal = ({ getAllMenu }) => {
  const [open, setOpen] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const menuData = {
      name: formData.get("name"),
      info: formData.get("info"),
      details: selectedSectionId,
    };

    addMenu(menuData)
      .then(() => {
        setShowSuccessModal(true);
        setTimeout(() => {
          getAllMenu();
        }, 3000);
      })
      .catch((error) => {
        console.log("Check the error adding Menu: ", error);
        console.log("Check the error section: ", menuData);
      });
    setOpen(false);
  };

  const handleSelectSection = (selectedSectionId) => {
    setSelectedSectionId(selectedSectionId); // Update the selected recipe ID
  };

  const theme = createTheme();

  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Thêm Menu
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Thêm Menu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Tên Menu"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="info"
            name="info"
            label="Chi tiết"
            fullWidth
            variant="standard"
          />
          <SelectSectionModal onSectionSelect={handleSelectSection} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Thêm Menu</Button>
        </DialogActions>
      </Dialog>
      {showSuccessModal && <SuccessModal message="Tạo thành công." />}
    </React.Fragment>
  );
};
