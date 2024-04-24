import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";

import { updateMenu } from "../../../../../services/BusinessService";
import SuccessModal from "../../../modal/SuccessModal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SelectSectionModal from "./SelectSectionModal";

export const EditMenuModal = ({ menu, getAllMenu }) => {
  const [open, setOpen] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control the success modal
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

    updateMenu(menu.id, menuData)
      .then(() => {
        setShowSuccessModal(true);
        setTimeout(() => {
          getAllMenu();
        }, 3000);
      })
      .catch((error) => {
        console.log("Check the error updating section: ", error);
        console.log("Check the error section: ", menuData);
      });
    setOpen(false);
  };

  const handleSelectedSection = (selectedSectionId) => {
    setSelectedSectionId(selectedSectionId); // Update the selected recipe ID
  };

  const theme = createTheme();

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <ModeEditIcon />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Chỉnh sửa menu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Tên menu"
            fullWidth
            variant="standard"
            defaultValue={menu.name}
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
            defaultValue={menu.info}
          />
          <SelectSectionModal onSectionSelect={handleSelectedSection} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Xác nhận</Button>
        </DialogActions>
      </Dialog>
      {showSuccessModal && <SuccessModal message="Thao tác thành công." />}
    </React.Fragment>
  );
};
