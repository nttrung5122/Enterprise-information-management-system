import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";

import { updateMenuSection } from "../../../../../services/BusinessService";
import SuccessModal from "../../../modal/SuccessModal";
import SelectFoodModal from "./SelectFoodModal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export const EditSectionModal = ({ section, getAllMenuSection }) => {
  const [open, setOpen] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control the success modal
  const [selectedFoodId, setSelectedFoodId] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const sectionData = {
      name: formData.get("name"),
      info: formData.get("info"),
      details: selectedFoodId,
    };

    updateMenuSection(section.id, sectionData)
      .then(() => {
        setShowSuccessModal(true);
        setTimeout(() => {
          getAllMenuSection();
        }, 3000);
      })
      .catch((error) => {
        console.log("Check the error updating section: ", error);
        console.log("Check the error section: ", sectionData);
      });
    setOpen(false);
  };

  const handleSelectedFoodId = (selectedFoodId) => {
    setSelectedFoodId(selectedFoodId); // Update the selected recipe ID
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
        <DialogTitle>Chỉnh sửa phân loại</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Tên mục"
            fullWidth
            variant="standard"
            defaultValue={section.name}
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
            defaultValue={section.info}
          />
          <SelectFoodModal onFoodSelect={handleSelectedFoodId} />
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
