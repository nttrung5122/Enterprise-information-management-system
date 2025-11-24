import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";
import { updateMenuSection } from "../../../../../services/BusinessService";
import SelectFoodModal from "./SelectFoodModal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { toast } from "react-toastify";

export const EditSectionModal = ({ section, getAllMenuSection }) => {
  const [open, setOpen] = React.useState(false);

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
        toast.success("Cập nhật phân loại thành công.");
        getAllMenuSection();
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
    </React.Fragment>
  );
};
