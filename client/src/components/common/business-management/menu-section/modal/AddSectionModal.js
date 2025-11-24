import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { addMenuSection } from "../../../../../services/BusinessService";
import SelectFoodModal from "./SelectFoodModal";
import { toast } from "react-toastify";

export const AddSectionModal = ({ getAllMenuSection }) => {
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

    addMenuSection(sectionData)
      .then(() => {
        toast.success("Thêm phân loại thành công.");
        getAllMenuSection();
      })
      .catch((error) => {
        console.log("Check the error adding section: ", error);
        console.log("Check the error section: ", sectionData);
        toast.error("Thêm phân loại thất bại.");
      });
    setOpen(false);
  };

  const handleSelectedFoodId = (selectedFoodId) => {
    setSelectedFoodId(selectedFoodId); // Update the selected recipe ID
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Thêm phân loại
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Thêm phân loại</DialogTitle>
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
          <SelectFoodModal onFoodSelect={handleSelectedFoodId} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Thêm phân loại</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
